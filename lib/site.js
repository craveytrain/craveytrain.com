const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');
const through = require('through2');
const site = require('js-yaml').safeLoad(fs.readFileSync('./site.yaml', 'utf8'));

let manifest;

const getSiteData = () => ({
  ...site,
  assets: manifest
});

// boilerplate plugin stuff
module.exports = ({destination}) => {
  if (!manifest) {
    manifest = JSON.parse(fs.readFileSync(path.join(destination, 'rev-manifest.json'), 'utf8'));
  }

  return through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      cb(new gutil.PluginError('excerpt', 'Streaming not supported'));

      return;
    }

    try {
      if (!file.site) {
        file.site = getSiteData();
      }

      this.push(file);
    }
    catch (err) {
      this.emit('error', new gutil.PluginError('excerpt', err));
    }

    cb();
  });
};
