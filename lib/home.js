const gutil = require('gulp-util');
const path = require('path');
const through = require('through2');

module.exports = () => {
  const model = {};

  return through.obj(
    // transform function for each file
    function(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);

        return;
      }

      if (file.isStream()) {
        cb(new gutil.PluginError('home', 'Streaming not supported'));

        return;
      }

      try {
        if ({about: 1, contact: 1}[path.dirname(file.relative)]) {
          model[path.dirname(file.relative)] = {
            title: file.data.title,
            body: file.contents.toString('utf-8')
          };
        }
      }
      catch (err) {
        this.emit('error', new gutil.PluginError('home', err));
      }

      cb();
    },
    // flush function for the end of the stream
    function(cb) {
      const homeFile = new gutil.File({
        base: __dirname,
        path: path.join(__dirname, 'index.html')
      });

      homeFile.data = Object.assign(
        {
          pageType: 'home'
        },
        model
      );

      this.push(homeFile);

      cb();
    }
  );
};
