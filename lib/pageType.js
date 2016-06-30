const gutil = require('gulp-util');
const through = require('through2');
const path = require('path');

const pageType = file => {
  const dirs = file.relative.split(path.sep);

  if (dirs[0] === 'posts') {
    return 'post';
  }

  return 'page';
};

// boilerplate plugin stuff
module.exports = () => through.obj(function(file, enc, cb) {
  if (file.isNull()) {
    cb(null, file);

    return;
  }

  if (file.isStream()) {
    cb(new gutil.PluginError('render', 'Streaming not supported'));

    return;
  }

  try {
    file.data.pageType = pageType(file);
    this.push(file);
  }
  catch (err) {
    this.emit('error', new gutil.PluginError('render', err));
  }

  cb();
});
