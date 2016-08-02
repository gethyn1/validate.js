const gulp          = require('gulp');
const gulpsync      = require('gulp-sync')(gulp);
const plumber       = require('gulp-plumber');
const gutil         = require('gulp-util');
const gulp_if       = require('gulp-if');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const webpack       = require('gulp-webpack');
const autoprefixer  = require('gulp-autoprefixer');
const rename        = require('gulp-rename');
const config        = require('./config');
const browserSync   = require('browser-sync').create();


/* 
 
 Configure module options
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

*/

// Determine environment based on argv options
const i = process.argv.indexOf('--env'),
    env = (i > -1) ? process.argv[i+1] : 'development';

// Define general on error function
const onError = function(err) {  
    gutil.beep();
};

// Define sass options
const sassOptions = {
  errLogToConsole: true,
  outputStyle: (env === 'development') ? 'expanded' : 'compressed'
};

// Set environmental vars for webpack
const webpackConfig = {
    development: require('./webpack-config.js')('development'),
    production: require('./webpack-config.js')('production')
};

// Define autoprefixer options
const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


/* 
 
 Define individual gulp tasks
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

*/

// Sass task
gulp.task('sass', () => {
    return gulp
        .src(config.src.sass)
        // Handle error events with plumber
        .pipe(plumber({ errorHandler: onError }))
        // Init sourcemaps if in development
        .pipe(gulp_if((env === 'development'), sourcemaps.init()))
        // Log sass errors to console
        .pipe(sass(sassOptions).on('error', sass.logError))
        // Run autoprefixer
        .pipe(autoprefixer(autoprefixerOptions))
        // Rename the file
        .pipe(rename({ basename: config.baseNames.css }))
        // Write source maps if in development
        .pipe(gulp_if((env === 'development'), sourcemaps.write()))
        .pipe(gulp.dest(config.dest.css))
        // Inject css with browser sync
        .pipe(browserSync.stream());
});


// Webpack js task
gulp.task('webpack', () => {
    return gulp
        .src([config.src.js])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(webpack( webpackConfig[env] ))
        .pipe(rename({ basename: config.baseNames.js }))
        .pipe(gulp.dest(config.dest.js));
});


/* 
 
 Setup static server and watch files with Browser Sync
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

*/

// Create a Static Server on port 3000
gulp.task('serve', ['sass', 'webpack'], () => {

    // Setup a proxy server
    browserSync.init({
        proxy: config.proxy,
        port: 3000
    });

    // Watch files for updates and inject into page
    gulp.watch(config.src.sass, ['sass']);

    // Watch and listen for js seperately as compiling with webpack
    gulp.watch(config.src.js, ['webpack']);
    gulp.watch(config.dest.js + '/main.js').on('change', browserSync.reload);

    // Watch for changes to html
    gulp.watch(config.src.html).on('change', browserSync.reload);
});


/* 
 
 efine environmental tasks tasks
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

*/

gulp.task(
    'development',
    gulpsync.sync([
        ['sass', 'webpack'],
        'serve'
    ]));

gulp.task(
    'production',
    gulpsync.sync([
        ['sass', 'webpack']
    ]));