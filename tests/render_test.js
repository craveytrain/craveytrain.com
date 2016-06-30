const test = require('tape');
const gutil = require('gulp-util');
const render = require('../lib/render');
const pug = require('pug');

test.skip('#render', t => {
  const stream = render();
  const contents = 'some contents';
  const markup = pug.renderFile('./templates/post.pug', {body: contents});

  stream.once('data', file => {
    t.equal(file.contents.toString(), markup);
  });

  stream.on('end', () => {
    t.end();
  });

  const file = new gutil.File({
    contents: new Buffer(contents)
  });
  file.data = {
    pageType: 'post'
  };

  stream.write(file);

  stream.end();
});
