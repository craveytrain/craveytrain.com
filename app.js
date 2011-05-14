var express = require('express'),
		http = require('http'),
		md = require('markdown').markdown,
		request = require('request'),
		qs = require('querystring'),
		redis = require('redis'),
		client = redis.createClient(),
		hl = require('highlight').Highlight,
		oauth = require('oauth').OAuth;
		
require('./libs/prototype.js');

client.on('error', function(err) {
	console.log('Error ' + err);
});

var app = express.createServer();

var keys = require('./keys.js');

var oa = new oauth(
	'https://twitter.com/oauth/request_token',
	'https://twitter.com/oauth/access_token',
	keys._twitterConsumerKey,
	keys._twitterConsumerSecret,
	'1.0A',
	'http://localhost/sessions/callback',
	'HMAC-SHA1'
);

app.configure(function() {
	app.use(express.static(__dirname + '/public'))
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'test' }));
});

app.configure('dev', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	app.use(express.logger());
});

app.register('.md', {
	compile: function(str, options){
		var html = md.toHTML(str);
		return function(locals){
			return html.replace(/\{([^}]+)\}/g, function(_, name){
				var cur = locals;
				name.split('.').forEach(function(prop) {
					cur = cur[prop]
				})
				return cur;
			});
		};
	}
});

function NotFound(msg) {
	this.name = 'NotFound';
	Error.call(this, msg);
	Error.captureStackTrace(this, arguments.callee);
}

var get = {
	db: 'http://localhost:5984/craveytrain/',
	post: function(req, res, next) {
		request({ uri: get.db + req.params.slug }, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var post = JSON.parse(body);
				post.timestamp = new Date(post.timestamp);
				req.post = post;
				next();
			} else {
				next(new NotFound);
			}
		});
	},
	posts: function(req, res, next) {
		request({ uri: get.db + '_design/posts/_view/byDate?descending=true' }, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				req.posts = JSON.parse(body).rows.map(function(post) {
					post.value.timestamp = new Date(post.value.timestamp);
					return post.value;
				});
				next();
			} else {
				next(new NotFound);
			}
		});
	},
	feed: function(req, res, next) {
		request({ uri: get.db + '_design/posts/_view/byDate?descending=true' }, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				req.items = JSON.parse(body).rows.map(function(item) {
					item.value.timestamp = new Date(item.value.timestamp);
					item.value.url = 'http://craveytrain/posts/' + item.value._id;
					return item.value;
				});
				next();
			} else {
				next(new NotFound);
			}
		});
	},
	byTag: function(req, res, next) {
		req.params.tag = req.params.tag.unurlify();
		var url = get.db + '_design/byTag/_view/byDate?descending=true&startkey=[%22' + qs.escape(req.params.tag) + '%22,{}]&endkey=[%22' + qs.escape(req.params.tag) + '%22]';
		request({ uri: url }, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				req.articles = JSON.parse(body).rows.map(function(art) {
					art.value.timestamp = new Date(art.value.timestamp);
					return art.value;
				});
				next();
			} else {
				req.articles = [];
				next();
			}
		});
	}
};

var gist = {
	re: /^(\<p\>)?\<a href="https:\/\/gist.github.com\/(\d+)#?(file_)?([\da-z_\.]+)?"\>[\w\s_\.\d]+\<\/a\>(\<\/p\>)?$/gim,
	find: function(req, res, next) {
		var content = req.post.content, hasGists = false;
				
		req.gists = {};
		
		req.post.content = content.replace(gist.re, function(str, blah1, /* String */ id){
			req.gists[id] = {};
			hasGists = true;
			return str;
		});
		
		if (hasGists) {
			gist.fetch(req, res, next);
		} else {
			next();
		}
	},
	fetch: function(req, res, next) {
		for (id in req.gists) {
			if (req.gists.hasOwnProperty(id)) {
				request({ url: 'https://api.github.com/gists/' + id }, function(error, response, body) {
					var gistObj = (body) ? JSON.parse(body) : {};
					client.get(id, function(err, cached) {
						if (error && !cached) next();
						cached = JSON.parse(cached);
						
						if (!cached || (cached.created_at !== gistObj.created_at)) {
							// if cached doesn't exists or the dates don't match
							// beautify it
							cached = gist.prettify(gistObj);

							// cache it
							client.set(id, JSON.stringify(cached));
						}

						req.gists[id] = cached;

						// if gists is full, pass the dutchie
						for (id2 in req.gists) {
							if (req.gists.hasOwnProperty(id2) && req.gists[id2]) gist.replace(req, res, next);
						}
					});
				});
			}
		}
	},
	prettify: function(/* Object */ gistObj) {
		for (file in gistObj.files) {
			if (gistObj.files.hasOwnProperty(file)) {
				gistObj.files[file].content = hl(gistObj.files[file].content);
			}
		}
		return gistObj;
	},
	replace: function(req, res, next) {
		var content = req.post.content;
		
		req.post.content = content.replace(gist.re, function(str, blah1, /* String */ id, blah2, /* String? */ filename) {
			if (filename) {
				return '<pre class="gist">' + req.gists[id].files[filename].content + '</pre>';
			} else {
				var multiGist = '';
				for (file in req.gists[id].files) {
					if (req.gists[id].files.hasOwnProperty(file)) {
						multiGist += '<pre class="gist">' + req.gists[id].files[file].content + '</pre>';
					}
				}
				
				return multiGist;
			}
		});
				
		next();	
	}
};

app.get('/', get.posts,  function(req, res) {
	var page = { title: 'craveytrain', bodyId: "home", desc: 'The website of Mike Cravey.' };
	res.render('index', { posts: req.posts, page: page });
});

// Static pages
app.get('/about', function(req, res) {
	var page = { title: 'About craveytrain', bodyId: 'about', bodyClass: 'static' };
	res.render('about.md', { layout: 'layout.jade', page: page });
});

app.get('/contact', function(req, res) {
	var page = { title: 'Contact craveytrain', bodyId: 'contact', bodyClass: 'static' };
	res.render('contact.md', { layout: 'layout.jade', page: page });
});

// Posts
app.get('/posts', get.posts,  function(req, res) {
	var page = { title: 'Posts on craveytrain', bodyId: 'posts', bodyClass: 'list' };
	res.render('posts', { posts: req.posts, page: page });
});

app.get('/posts/:slug', get.post, gist.find, function(req, res, next) {
	var page = { bodyId: req.params.slug, bodyClass: 'single', title: req.post.title, gist: (req.gist) ? true: false };
	res.render('posts/post', { post: req.post, page: page });
});

// Tags
app.get('/tags/:tag', get.byTag, function(req, res) {
	var page = { title:  'Articles tagged with ' + req.params.tag, bodyId: 'tags', bodyClass: 'list' };
	res.render('tags', { articles: req.articles, page: page });
});

// Feed
app.get('/feed', get.feed, function(req, res) {
	var page = { title: 'Craveytrain', desc: 'The website of Mike Cravey.' };
	res.contentType('application/xml');
	res.render('feed', { layout: 'feed/index', items: req.items, page: page });
});

// OAuth sign up
app.get('/sessions/connect', function(req, res) {
	oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
		if (error) {
			res.send("Error getting OAuth request token : " + sys.inspect(error), 500);
		} else {
			req.session.oauthRequestToken = oauthToken;
			req.session.oauthRequestTokenSecret = oauthTokenSecret;
			res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
		}
	});
});

// OAuth Callback
app.get('/sessions/callback', function(req, res) {
	oa.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
		if (error) {
			res.send("Error getting OAuth access token : " + sys.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+sys.inspect(results)+"]", 500);
		} else {
			req.session.oauthAccessToken = oauthAccessToken;
			req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
			// Right here is where we would write out some nice user stuff
			oa.get("http://twitter.com/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
				if (error) {
					res.send("Error getting twitter screen name : " + sys.inspect(error), 500);
				} else {
					req.session.twitterScreenName = JSON.parse(data).screen_name;
					res.send('You are signed in: ' + req.session.twitterScreenName);
				}  
			});  
		}
	});
});

app.get('/404', function(req, res) {
	throw new NotFound;
});

app.use(function(req, res, next){
  next(new NotFound);
});

app.error(function(err, req, res, next) {
	if (err instanceof NotFound) {
		var page = { title: 'Not Found', bodyClass: 'error' };
		res.render('404.md', { status: 404, layout: 'layout.jade', page: page });
	} else {
		next(err);
	}
});

app.listen(80);
console.log('Started on port 80');