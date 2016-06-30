const tap = require('gulp-tap');

module.exports = () => tap(file => {
  console.log('file', file);
  if (file.contents) {
    console.log('contents', file.contents.toString('utf-8'));
  }
  console.log('is buffer', file.isBuffer());
  console.log('is stream', file.isStream());
  console.log('cwd', file.cwd);
  console.log('base', file.base);
  console.log('path', file.path);
  console.log('history', file.history);
  console.log('relative', file.relative);
  console.log('dirname', file.dirname);
  console.log('basename', file.basename);
  console.log('stem', file.stem);
  console.log('extname', file.extname);
  console.log('data', file.data);
});
