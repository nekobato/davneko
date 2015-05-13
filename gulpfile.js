/*
 * modules
 */

// common
var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

// error
var notify = require('gulp-notify');

// js
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var assign = require('lodash').assign;
var source = require('vinyl-source-stream');

// css
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

// server
var gls = require('gulp-live-server');


// Javascript

var customOpts = {
  entries: ['./src/javascripts/script.coffee'],
  debug: true,
  transform: ['coffeeify'],
  extensions: ['.coffee']
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// task "js"
gulp.task('js', bundle);

b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/javascripts'));
}

// task "js-build"
gulp.task('js-build', function() {

  var b = browserify(customOpts);

  return b.bundle()
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(gulp.dest('./public/javascripts'));
});


// Stylesheet

// task "css"
gulp.task('css', function() {
  return gulp.src('./src/stylesheets/**/*.sass')
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass({
      indentedSyntax: true
    }))
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/stylesheets'));
});


// Server daemon

// task "server"
gulp.task('server', function() {

  var env = process.env;
  env.NODE_ENV = process.env.NODE_ENV || 'development';

  var server = gls('bin/www', env, false);
  server.start();

  gulp.watch(['bin/www', 'config/**/*.coffee'], [server.start]);
});


// Tasks

gulp.task('default', ['js', 'css', 'server'], function() {
  gulp.watch('./src/stylesheets/**/*.sass', ['css']);
});

gulp.task('build', ['js-build', 'css']);
