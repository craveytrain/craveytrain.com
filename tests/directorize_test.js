const test = require('tape');
const gutil = require('gulp-util');
const directorize = require('../lib/directorize');

test('#directorize', t => {
  const stream = directorize();

  stream.on('data', file => {
    t.equal(file.path, 'dir/index.html');
  });

  stream.on('end', () => {
    t.end();
  });

  stream.write(new gutil.File({
    path: 'dir.html'
  }));

  stream.end();
});
