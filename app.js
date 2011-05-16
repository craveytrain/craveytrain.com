var express = require('express'),
		http = require('http'),
		md = require('markdown').markdown,
		qs = require('querystring'),
		redis = require('redis'),
		client = redis.createClient(),
		request = require('request'),
		keys = require('./keys.js');
		
require('./libs/prototype.js');

var gist = require('./libs/gist.js');

client.on('error', function(err) {
	console.log('Error ' + err);
});

var app = express.createServer(express.static(__dirname + '/public'));

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
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
	get: {
		post: function(req, res, next) {
			request({ uri: db.connString + req.params.slug }, function(error, response, body) {
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
	}
};

function validateForm(req, res, next) {
	var form = req.body, errors = [];
	console.log(form);
	
	for (field in form) {
		if (form.hasOwnProperty(field)) {
			if (!form[field]) {
				errors.push(field + ' is blank');
			}
		}
	}
	
	if (!errors.length) {
		next();
	} else {
		console.log(errors);
		next();
	}
}

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

app.get('/posts/:slug', db.get.post, gist.find, function(req, res, next) {
	var page = { bodyId: req.params.slug, bodyClass: 'single', title: req.post.title, gist: (req.gist) ? true: false };
	res.render('posts/post', { post: req.post, page: page });
});

app.post('/comment/:slug', validateForm, function(req, res, next) {
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