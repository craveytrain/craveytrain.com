const gutil = require('gulp-util');
const through = require('through2');
const stripMarkdown = require('remove-markdown');

const excerptize = contents => {
  const cutPoint = contents.indexOf('\n');

  return stripMarkdown(cutPoint > 0 ? contents.substring(0, cutPoint) : contents);
};

// boilerplate plugin stuff
module.exports = () => through.obj(function(file, enc, cb) {
  if (file.isStream()) {
    cb(new gutil.PluginError('excerpt', 'Streaming not supported'));

    return;
  }

  try {
    if (!file.data.excerpt) {
      file.data.excerpt = excerptize(file.contents.toString('utf-8'));
    }

    this.push(file);
  }
  catch (err) {
    this.emit('error', new gutil.PluginError('excerpt', err));
  }

  cb();
});
