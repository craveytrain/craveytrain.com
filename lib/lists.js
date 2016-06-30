const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');
const generatePosts = require('./generatePostForList');

module.exports = () => {
  const lists = {};

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
        const relPath = path.dirname(path.dirname(file.relative));
        if (!lists[relPath]) {
          lists[relPath] = [];
        }

        lists[relPath].push(file);
      }
      catch (err) {
        this.emit('error', new gutil.PluginError('lists', err));
      }

      cb();
    },
    // flush function for the end of the stream
    function(cb) {
      Object.keys(lists).forEach(list => {
        const listFile = new gutil.File({
          base: __dirname,
          path: path.join(__dirname, list, 'index.html')
        });

        listFile.data = {
          title: 'Posts',
          pageType: 'list',
          posts: lists[list].map(generatePosts).sort((a, b) => b.date - a.date)
        };

        this.push(listFile);
      });

      cb();
    }
  );
};
