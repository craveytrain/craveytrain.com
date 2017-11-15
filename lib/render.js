const gutil = require('gulp-util');
const through = require('through2');
const pug = require('pug');

const render = file => {
  const pageType = file.data.pageType;
  // create the data object
  const data = {
    site: file.site,
    ...file.data,
    body: file.contents ? file.contents.toString('utf-8') : ''
  };

  return pug.renderFile(`./templates/${pageType}.pug`, data);
};

// boilerplate plugin stuff
module.exports = () => through.obj(function(file, enc, cb) {
  try {
    file.contents = new Buffer(render(file));
    this.push(file);
  }
  catch (err) {
    this.emit('error', new gutil.PluginError('render', err));
  }

  cb();
});
