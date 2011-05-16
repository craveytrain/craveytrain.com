var request = require('request'),
		redis = require('redis'),
		client = redis.createClient(),
		hl = require('highlight').Highlight;

var gist = {
	re: /^(\<p\>)?\<a href="https:\/\/gist.github.com\/(\d+)#?(file_)?([\da-z_\.]+)?"\>[\w\s_\.\d]+\<\/a\>(\<\/p\>)?$/gim,

	find: function(req, res, next) {
		var content = req.post.content, hasGist = false;

		req.gists = {};
		req.gistCount = 0;

		req.post.content = content.replace(gist.re, function(str, blah1, /* String */ id){
			req.gists[id] = {};
			hasGist = true;
			return str;
		});

		if (hasGist) {
			gist.fetch(req, res, next);
		} else {
			next();
		}
	},

	fetch: function(req, res, next) {
		for (id in req.gists) {
			if (req.gists.hasOwnProperty(id)) {
				// Add one for each gist
				req.gistCount++;
				request({ url: 'https://api.github.com/gists/' + id }, function(error, response, body) {
					req.gists[id] = (!error && response.statusCode === 200) ? JSON.parse(body) : null;
					gist.getCached(req, res, next, id);
				});
			}
		}
	},
	
	getCached: function(req, res, next, id) {
		client.get(id, function(err, cached) {
			var local = (cached) ? local = JSON.parse(cached) : null,
					gotResponse = false;
			
			// Minus one for the gist
			req.gistCount--;

			// if github has it
			if (req.gists[id]) {

				// if it's not local or if they don't have the same date
				if (!local || (local.created_at !== req.gists[id].created_at)) {

					// pretty it up
					local = gist.prettify(req.gists[id]);
					
					// store it for next time
					client.set(id, JSON.stringify(local));
				}
			}

			// add it to the request object
			req.gists[id] = local;
			
			if (!req.gistCount) {
				for (gistId in req.gists) {
					if (req.gists.hasOwnProperty(gistId)) {
						if (req.gists[gistId]) gotResponse = true;
					}
				}
				if (gotResponse) {
					gist.replace(req, res, next);
				} else {
					next();
				}
			}
		});
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