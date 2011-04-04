var express = require('express'),
		http = require('http'),
		md = require('markdown').markdown,
		request = require('request');

var app = express.createServer(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

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

Object.defineProperty(Date.prototype, 'toRelative', {
	enumerable: false,
	value: function() {
		var now = new Date().getTime() / 1000,
				then = this.getTime() / 1000,
				delta = Math.floor(now - then);
				
		if (delta === 1) return '1 second ago';
		if (delta < 60) return delta + ' seconds ago';
		if (delta < 120) return '1 minute ago';
		if (delta < 3600) return Math.floor(delta / 60) + ' minutes ago';
		if (delta < 7200) return '1 hour ago';
		if (delta < 86400) return Math.floor(delta / 3600) + ' hours ago';
		if (delta < 172800) return '1 day ago';
		if (delta < 31536000) return Math.floor(delta / 86400) + ' days ago';
		if (delta < 63072000) return '1 year ago';
		return Math.floor(delta / 31536000) + ' years ago';
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
			var post;
			if (!error && response.statusCode === 200) {
				post = JSON.parse(body);
				post.timestamp = new Date(post.timestamp);
				req.post = post;
				next();
			} else {
				next(new NotFound);
			}
		});
	},
	posts: function(req, res, next) {
		request({ uri: get.db + '_design/posts/_view/posts' }, function(error, response, body) {
			var results, posts;
			if (!error && response.statusCode === 200) {
				results = JSON.parse(body).rows;
				posts = results.map(function(post) {
					post.value.timestamp = new Date(post.value.timestamp);
					return post.value;
				});
				req.posts = posts;
				next();
			} else {
				next(new NotFound);
			}
		});
	}
};

app.get('/', get.posts,  function(req, res) {
	var page = { title: 'craveytrain', bodyId: "home" };
	res.render('index', { posts: req.posts, page: page });
});

app.get('/about', function(req, res) {
	var page = { title: 'About', bodyId: 'about', bodyClass: 'static' };
	res.render('about.md', { layout: 'layout.jade', page: page });
});

app.get('/contact', function(req, res) {
	var page = { title: 'Contact', bodyId: 'contact', bodyClass: 'static' };
	res.render('contact.md', { layout: 'layout.jade', page: page });
});

app.get('/posts', get.posts,  function(req, res) {
	var page = { title: 'Posts', bodyId: 'posts' };
	res.render('posts', { posts: req.posts, page: page });
});

app.get('/posts/:slug', get.post, function(req, res, next) {
	var page = {bodyId: req.params.slug, bodyClass: 'single' };
	res.render('posts/post', { post: req.post, page: page });
			
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

app.listen(3000);
console.log('Started on port 3000');