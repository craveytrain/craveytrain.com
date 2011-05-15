var request = require('request'),
		redis = require('redis'),
		client = redis.createClient(),
		hl = require('highlight').Highlight;

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

for (prop in gist) {
	if (gist.hasOwnProperty(prop)) exports[prop] = gist[prop];
}