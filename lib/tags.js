const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');
const generatePosts = require('./generatePostForList');

module.exports = () => {
  const tags = {};

  return through.obj(
    // transform function for each file
    function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);

        return;
      }

      if (file.isStream()) {
        cb(new gutil.PluginError('tags', 'Streaming not supported'));

        return;
      }

      try {
        // if no tags, return early
        if (file.data && file.data.tags) {
          file.data.tags.forEach(tag => {
            if (!tags[tag]) {
              tags[tag] = [];
            }

            tags[tag].push(file);
          });
        }
      }
      catch (err) {
        this.emit('error', new gutil.PluginError('tags', err));
      }

      cb();
    },
    // flush function for the end of the stream
    function(cb) {
      Object.keys(tags).forEach(tag => {
        const tagFile = new gutil.File({
          base: __dirname,
          path: path.join(__dirname, 'tags', tag, 'index.html')
        });

        tagFile.data = {
          title: tag,
          pageType: 'tag',
          posts: tags[tag].map(generatePosts).sort((a, b) => b.date - a.date)
        };

        this.push(tagFile);
      });

      cb();
    }
  );
};
