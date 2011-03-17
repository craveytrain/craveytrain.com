var express = require('express'),
		fs = require('fs'),
		md = require('markdown').markdown;
		
var app = express.createServer(express.static(__dirname + '/public'));

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

Object.defineProperty(Object.prototype, "extend", {
	enumerable: false,
	value: function(from) {
		var props = Object.getOwnPropertyNames(from);
		var dest = this;
		props.forEach(function(name) {
			if (name in dest) {
				var destination = Object.getOwnPropertyDescriptor(from, name);
				Object.defineProperty(dest, name, destination);
			}
		});
		return this;
	}
});


app.set('view engine', 'jade');

// Temporary data
var posts = {
	first: {
		timestamp: new Date(),
		tags: ['foo', 'bar', 'test'],
		title: 'This is the post title',
		comments: [
			{
				author: 'Comment Author',
				comment: 'Lorem ipsum dolor sit amet.',
				timestamp: new Date()
			}
		]
	}
};

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/about', function(req, res) {
	var page = { title: 'About' };
	res.render('about.md', { layout: 'layout.jade', page: page });
});

app.get('/posts', function(req, res) {
	var page = { title: 'Posts' };
	res.render('posts', {posts: posts, page: page});
});

app.get('/posts/:slug', function(req, res) {
	// Add if for both slug in posts and md file exists
	var post = posts[req.params.slug];
	fs.readFile(__dirname + '/posts/' + req.params.slug + '.md', 'UTF-8', function(e, d) {
		if (e) console.log(e);
		post.content = md.toHTML(d);
		var page = {};
		res.render('posts/post', { post: post, page: page });
	});
});

app.listen(3000);
console.log('Started on port 3000');