const gutil = require('gulp-util');
const through = require('through2');
const path = require('path');

const newPath = filePath => {
  const pathParts = path.parse(filePath);

  return path.join(pathParts.dir, pathParts.name, `index${pathParts.ext}`);
};

// boilerplate plugin stuff
module.exports = () => through.obj(function(file, enc, cb) {
  if (file.isStream()) {
    cb(new gutil.PluginError('directorize', 'Streaming not supported'));

    return;
  }

  try {
    file.path = newPath(file.path);
    this.push(file);
  }
  catch (err) {
    this.emit('error', new gutil.PluginError('directorize', err));
  }

  cb();
});
