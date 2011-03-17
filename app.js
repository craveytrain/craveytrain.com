var app = require('express').createServer(),
		fs = require('fs'),
		md = require('markdown').markdown;

// register .md so that markdown may comply
// with the express view system by implementing
// a .compile() method
app.register('.md', {
  compile: function(str, options){
    var html = md.toHTML(str);
    return function(locals){
      return html.replace(/\{([^}]+)\}/g, function(_, name){
        return locals[name];
      });
    };
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
	res.send('hello world');
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('/posts', function(req, res) {
	res.partial('posts', posts);
});

app.get('/posts/:slug', function(req, res) {
	// Add if for both slug in posts and md file exists
	var post = posts[req.params.slug];	
	fs.readFile(__dirname + '/posts/' + req.params.slug + '.md', 'UTF-8', function(e, d) {
		if (e) console.log(e);
		post.content = md.toHTML(d);
		res.partial('posts/post', post);
	});
});

app.listen(3000);
console.log('Started on port 3000');