var express = require('express'),
		fs = require('fs'),
		http = require('http'),
		md = require('markdown').markdown;


var db = {
	opts: {
		host: '127.0.0.1',
		port: 5984
	},
	queries: {
		posts: '/craveytrain/_design/posts/_view/posts'
	}
};		
		
var app = express.createServer(express.static(__dirname + '/public'));

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

Object.defineProperty(Object.prototype, 'import', {
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

app.set('view engine', 'jade');



var site = {
	title: 'craveytrain',
	bodyId: '',
	bodyClass: ''
};

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/about', function (req, res) {
	var page = { title: 'About', bodyId: 'about', bodyClass: 'static' }.import(site);
	res.render('about.md', { layout: 'layout.jade', page: page });
});

app.get('/posts', function (req, res) {
	var page = { title: 'Posts', bodyId: 'posts' }.import(site),
			query = '';
	db.opts.path = db.queries.posts;
	http.get(db.opts, function(get){
		get.setEncoding('utf8');

		get.on('data', function (chunk) {
			query += chunk;
		});
		
		get.on('end', function () {
			query = JSON.parse(query);
			var posts = query.rows;
			console.log(posts);
			res.render('posts', {posts: posts, page: page});
		});
	});
});

app.get('/posts/:slug', function (req, res) {
	// TODO: Add if for both slug in posts and md file exists
	var slug = req.params.slug,
			post = posts.filter(function (post) { return (post.slug === slug); })[0],
			page = { title: post.title, bodyId: slug, bodyClass: 'single' }.import(site);
	fs.readFile(__dirname + '/posts/' + slug + '.md', 'UTF-8', function (e, d) {
		if (e) console.log(e);
		post.content = md.toHTML(d);
		res.render('posts/post', { post: post, page: page });
	});
});

app.listen(3000);
console.log('Started on port 3000');