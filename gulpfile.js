const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const render = require('./lib/render');
const rev = require('gulp-rev');

const dest = 'public';

const getPages = (glob, opts) => gulp.src(glob, opts)
  .pipe(require('gulp-gray-matter')())
  .pipe(require('./lib/excerpt')())
  .pipe(require('gulp-marked')({
    highlight: code => require('highlight.js').highlightAuto(code).value
  }))
  .pipe(require('./lib/pageType')())
  .pipe(require('./lib/directorize')());

gulp.task('generate:home', ['assets'], () => getPages(['content/*.md'])
  .pipe(require('./lib/home')())
  .pipe(require('./lib/site')({
    destination: dest
  }))
  .pipe(render())
  .pipe(gulp.dest(dest))
);

gulp.task('generate:pages', ['assets'], () => getPages(['content/**/*.md', '!content/posts'])
  .pipe(require('./lib/site')({
    destination: dest
  }))
  .pipe(render())
  .pipe(gulp.dest(dest))
);

gulp.task('generate:posts', ['assets'], () => getPages(['content/posts/*.md'], {base: 'content'})
  .pipe(require('./lib/site')({
    destination: dest
  }))
  .pipe(render())
  .pipe(gulp.dest(dest))
);

gulp.task('generate:tags', ['assets'], () => getPages(['content/posts/*.md'], {base: 'content'})
  .pipe(require('./lib/tags')())
  .pipe(require('./lib/site')({
    destination: dest
  }))
  .pipe(render())
  .pipe(gulp.dest(dest))
);

gulp.task('generate:lists', ['assets'], () => getPages(['content/posts/*.md'], {base: 'content'})
  .pipe(require('./lib/lists')())
  .pipe(require('./lib/site')({
    destination: dest
  }))
  .pipe(render())
  .pipe(gulp.dest(dest))
);

gulp.task('generate:feed', ['assets'], () => getPages(['content/posts/*.md'], {base: 'content'})
  .pipe(require('./lib/feed')())
  .pipe(require('./lib/site')({
    destination: dest
  }))
  .pipe(render())
  .pipe(gulp.dest(dest))
);

gulp.task('css', () => gulp.src(
  [
    'css/**/*.css',
    'node_modules/highlight.js/styles/solarized-dark.css'
  ])
  .pipe(sourcemaps.init())
  .pipe(require('gulp-postcss')([
    require('postcss-cssnext')(),
    require('cssnano')({autoprefixer: false})
  ]))
  .pipe(rev())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(`${dest}/css`))
  .pipe(rev.manifest())
  .pipe(gulp.dest(dest))
);

gulp.task('statics', () => gulp.src(
  [
    'static/**/*.*'
  ])
  .pipe(gulp.dest(dest))
);

gulp.task('assets', [
  'css',
  'statics'
]);

gulp.task('build', [
  'generate:posts',
  'generate:pages',
  'generate:home',
  'generate:tags',
  'generate:lists',
  'generate:feed'
]);

gulp.task('default', ['build']);
