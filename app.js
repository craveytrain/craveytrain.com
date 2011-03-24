var express = require('express'),
		http = require('http'),
		md = require('markdown').markdown;


var db = {
	fetch: function (url, callback) {
		var opts = {
			host: 'localhost',
			port: 5984,
			path: url
		};	

		http.get(opts, function (res) {
			var results = '';
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				results += chunk;
			});
			res.on('end', function () {
				var tmp = JSON.parse(results);
				results = (tmp.rows) ? tmp.rows : tmp;
				callback(results);
			});
		});
	}
}
	
var app = express.createServer(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.register('.md', {
	compile: function(str, options){
		var html = md.toHTML(str);
		return function (locals){
			return html.replace(/\{([^}]+)\}/g, function (_, name){
				var cur = locals;
				name.split('.').forEach(function (prop) {
					cur = cur[prop]
				})
				return cur;
			});
		};
	}
});

Object.defineProperty(Object.prototype, 'backfill', {
	enumerable: false,
	value: function(from) {
		var props = Object.getOwnPropertyNames(from),
				dest = this;

		props.forEach(function (name) {
			if (dest[name] === undefined) {
				var destination = Object.getOwnPropertyDescriptor(from, name);
				Object.defineProperty(dest, name, destination);
			}
		});
		return this;
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


var site = {
	title: 'craveytrain',
	bodyId: '',
	bodyClass: ''
};

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/about', function (req, res) {
	var page = { title: 'About', bodyId: 'about', bodyClass: 'static' }.backfill(site);
	res.render('about.md', { layout: 'layout.jade', page: page });
});

app.get('/posts', function (req, res) {
	var page = { title: 'Posts', bodyId: 'posts' }.backfill(site);
	db.fetch('/craveytrain/_design/posts/_view/posts', function (posts) {
		res.render('posts', {posts: posts, page: page});
	});
});

app.get('/posts/:slug', function (req, res) {
	var slug = req.params.slug,
			page = {bodyId: slug, bodyClass: 'single' }.backfill(site);
			
	db.fetch('/craveytrain/' + slug, function (post) {
		page.title = post.title;
		res.render('posts/post', { post: post, page: page });
	});
});

app.listen(3000);
console.log('Started on port 3000');