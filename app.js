var http = require('http'),
		fs = require('fs'),
		path = require('path'),
		md = require('markdown').markdown;

var files = process.argv.slice(2);

var db = require('./db.js');

function Post () {
	this.type = 'post';
	this.timestamp = new Date();
	this.comments = [],
	this.tags = [],
	this.title = '';
	this.content = '';
	this.excerpt = '';
}

var post = new Post();

function parseFile (contents, slug) {
	var mdTree = md.parse(contents),
			body = md.toHTML(mdTree),
			contentStart = body.indexOf('</h1>') + 5,
			content = body.substring(contentStart).replace(/^\s+/, ''),
			excerptEnd = content.indexOf('.', 250) + 1 || content.length;
	post._id = slug;
	post.title = mdTree[1][2];
	post.content = content;
	post.excerpt = content.substring(0, excerptEnd).replace(/<.*?>/g, '').replace(/(\n\s?|\s{2,})/g, ' ');
	checkDoc(slug);
}

function checkDoc (slug) {
	var opts = {
		host: db.host,
		port: db.port,
		path: db.path + slug
	};
	http.get(opts, function (res) {
		var result = '',
				rev = res.headers.etag;
		if (rev) post._rev = rev.substring(1, rev.length - 1);
		res.setEncoding('utf8');
		res.on('data', function (chunk) { result += chunk; });
		res.on('end', function () {
			if (rev) {
				var oldPost = JSON.parse(result);
				post.comments = oldPost.comments;
				post.tags = oldPost.tags;
			}
			push(slug);
		});
	});
}

function push (slug) {
	var notNew = (post._rev) ? true : false,
	 		opts = {
				host: db.host,
				port: db.port,
				method: (notNew) ? 'PUT' : 'POST',
				path: (notNew) ? db.path + slug : db.path,
				headers: {
					'content-type': 'application/json',
					'Authorization': auth()
				}
			},
			req = http.request(opts, function (res) {
				if (res.statusCode !== 201) {
					// TODO: trap error and do something with it
				}
			});
	req.end(JSON.stringify(post));
}

function auth (u, p) {
	u = u || db.u;
	p = p || db.p;
	return 'Basic ' + new Buffer(u + ':' + p).toString('base64');
};

files.forEach(function (file) {
	fs.readFile(file, 'UTF-8', function (err, contents) {
		if (err) throw err;
		var slug = path.basename(file, '.md');
		parseFile(contents, slug);
	});
});
