const path = require( 'path' );
const gulp = require( 'gulp' );
const sourcemaps = require( 'gulp-sourcemaps' );

gulp.task( 'clean', done => {
	require( 'del' )( [
		'static/css',
		'static/img',
		'static/favicons',
		'static/js',
	] )
	.then( () => {
		done();
	} );
} );

gulp.task( 'copy', function () {
	return gulp.src( [ 'img/favicons/**/*' ], { base: '.' } )
	.pipe( gulp.dest( 'static/' ) );
} );

gulp.task( 'svg', function () {
	return gulp
		.src( 'img/sprite/*.svg' )
		.pipe( require( 'gulp-svgmin' )( function ( file ) {
			var prefix = path.basename( file.relative, path.extname( file.relative ) );
			return {
				plugins: [ {
					cleanupIDs: {
						prefix: prefix + '-',
						minify: true,
					},
				} ],
			}
		} ) )
		.pipe( require( 'gulp-svgstore' )() )
		.pipe( gulp.dest( 'static/img' ) );
} );

gulp.task( 'css', () => {
	const processors = [
		require( 'postcss-import' ),
		require( 'postcss-cssnext' )( {
			browsers: [ 'last 2 versions' ],
			warnForDuplicates: false, // autoprefixer run by cssnext and cssnano
		} ),
		require( 'postcss-rgba-hex' ), // Inline svg needs hex colors
		require( 'postcss-inline-svg' ),
		require( 'cssnano' ),
	];

	return gulp.src( './css/*.css' )
		.pipe( sourcemaps.init() )
		.pipe( require( 'gulp-postcss' )( processors ) )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( './static/css' ) );
} );

gulp.task( 'js', () => {
	const bundler = require( 'browserify' )( {
		entries: 'js/main.js',
		debug: true,
	} );

	bundler.transform( require( 'babelify' ) );

	bundler.bundle()
		.on( 'error', function ( err ) {
			/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
			console.error( err );
		} )
		.pipe( require( 'vinyl-source-stream' )( 'main.js' ) )
		.pipe( require( 'vinyl-buffer' )() )
		.pipe( sourcemaps.init( {
			loadMaps: true,
		} ) )
		.pipe( require( 'gulp-uglify' )() )
		.pipe( sourcemaps.write( './' ) )
		.pipe( gulp.dest( './static/js' ) );
} );

gulp.task( 'build', [ 'css', 'js', 'svg', 'copy' ] );
