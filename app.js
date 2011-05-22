var port = process.env.PORT || 3000,
		host = process.env.HOST || 'localhost',
		express = require('express'),
		http = require('http'),
		md = require('markdown').markdown,
		qs = require('querystring'),
		redis = require('redis'),
		client = redis.createClient(),
		hl = require('highlight').Highlight,
		oauth = require('oauth').OAuth,
		request = require('request'),
		keys = require('./keys.js');
		
require('./libs/prototype.js');

var gist = require('./libs/gist.js');

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
	'http://' + host + ':' + port + '/auth/callback',
	'HMAC-SHA1'
);

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'holas' }));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.static(__dirname + '/public'))
});

app.configure('dev', function() {
	app.use(express.logger());
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('dev', function() {
	app.use(express.errorHandler());
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

var db = {
	connString: keys.protocol + '://' + keys.host + ':' + keys.port + keys.path,
	auth: function(u, p) {
		u = u || keys.u;
		p = p || keys.p;
		return 'Basic ' + new Buffer(u + ':' + p).toString('base64');
	},
	get: {
		post: function(req, res, next) {
			request({ uri: db.connString + req.params.slug }, function(error, response, body) {
				if (!error && response.statusCode === 200) {
					var post = JSON.parse(body);
					post.timestamp = new Date(post.timestamp);
					post.comments.forEach(function(comment) {
						comment.timestamp = new Date(comment.timestamp);
					})
					req.post = post;
					next();
				} else {
					next(new NotFound);
				}
			});
		},
		posts: function(req, res, next) {
			request({ uri: db.connString + '_design/posts/_view/byDate?descending=true' }, function(error, response, body) {
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
			request({ uri: db.connString + '_design/posts/_view/byDate?descending=true' }, function(error, response, body) {
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
			var url = db.connString + '_design/byTag/_view/byDate?descending=true&startkey=[%22' + qs.escape(req.params.tag) + '%22,{}]&endkey=[%22' + qs.escape(req.params.tag) + '%22]';
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
	},
	post: {
		comment: function(req, res, next) {
			request({ uri: db.connString + req.params.slug }, function(error, response, body) {
				var post = JSON.parse(body);
				post.comments.push(req.body);
				
				request.put({
					uri: db.connString + req.params.slug,
					body: JSON.stringify(post),
					headers: {
						'Content-type': 'application/json',
						'Authorization': db.auth()
					}
				}, function(saveError, saveResponse, saveBody) { next() });
			});
		}
	}
};

var comment = {
	validate: function(req, res, next) {
		console.log(req.session);
		var form = req.body;

		if (form.comment) {
			form = comment.format(form);
			db.post.comment(req, res, next);
		} else {
			req.flash('error', 'Comment cannot be blank');
			next();
		}
	},
	format: function(/* Object */ form) {
		form.comment = md.toHTML(form.comment);
		form.comment = form.comment.replace(/\<a\s/gi, '<a rel="nofollow" ');
		form.timestamp = new Date();
	}
};

var getUser = function(req, res, next) {
	if (req.session.user) {
		next();
		return;
	}
	
	if (req.session.oauthAccessToken) {
		oa.get("http://twitter.com/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
			if (error) {
				// What error is this?
			} else {
				var twitter = JSON.parse(data);
				req.session.user = {
					id: twitter.id,
					name: twitter.screen_name,
					url: 'http://twitter.com/' + twitter.screen_name,
					img: twitter.profile_image_url
				}
			}
			next();  
		});  
	} else {
		req.session.returnUrl = req.url;
		next();
	}
};

app.get('/', db.get.posts,  function(req, res) {
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
app.get('/posts', db.get.posts,  function(req, res) {
	var page = { title: 'Posts on craveytrain', bodyId: 'posts', bodyClass: 'list' };
	res.render('posts', { posts: req.posts, page: page });
});

app.get('/posts/:slug', db.get.post, gist.find, getUser, function(req, res, next) {
	var page = { 
		bodyId: req.params.slug, 
		bodyClass: 'single', 
		title: req.post.title, 
		msgs: req.flash(),
		user: req.session.user
	};
	res.render('posts/post', { post: req.post, page: page });
});

app.post('/comment/:slug', comment.validate, function(req, res, next) {
	res.redirect('/posts/' + req.params.slug);
});

// Tags
app.get('/tags/:tag', db.get.byTag, function(req, res) {
	var page = { title:  'Articles tagged with ' + req.params.tag, bodyId: 'tags', bodyClass: 'list' };
	res.render('tags', { articles: req.articles, page: page });
});

// Feed
app.get('/feed', db.get.feed, function(req, res) {
	var page = { title: 'Craveytrain', desc: 'The website of Mike Cravey.' };
	res.contentType('application/xml');
	res.render('feed', { layout: 'feed/index', items: req.items, page: page });
});

// OAuth sign up
app.get('/auth/login', function(req, res) {
	oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
		if (error) {
			// What error is this?
		} else {
			req.session.oauthRequestToken = oauthToken;
			req.session.oauthRequestTokenSecret = oauthTokenSecret;
			res.redirect("https://twitter.com/oauth/authenticate?oauth_token="+req.session.oauthRequestToken);      
		}
	});
});

// OAuth Callback
app.get('/auth/callback', function(req, res) {
	oa.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
		if (error) {
			// What error is this?
		} else {
			req.session.oauthAccessToken = oauthAccessToken;
			req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
			// Redirect back to view
			res.redirect(req.session.returnUrl);
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

app.listen(port);
console.log('Started on port ' + port);