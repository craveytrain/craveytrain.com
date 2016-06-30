const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');
const generatePosts = require('./generatePostForList');

module.exports = () => {
  const posts = [];

  return through.obj(
    // transform function for each file
    function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);

        return;
      }

      if (file.isStream()) {
        cb(new gutil.PluginError('lists', 'Streaming not supported'));

        return;
      }

      try {
        posts.push(file);
      }
      catch (err) {
        this.emit('error', new gutil.PluginError('lists', err));
      }

      cb();
    },
    // flush function for the end of the stream
    function(cb) {
      const feedFile = new gutil.File({
        base: __dirname,
        path: path.join(__dirname, 'feed', 'index.xml')
      });

      feedFile.data = {
        pageType: 'feed',
        posts: posts.map(generatePosts).sort((a, b) => b.date - a.date)
      };

      this.push(feedFile);

      cb();
    }
  );
};
