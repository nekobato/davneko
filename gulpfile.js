/*
 * modules
 */

// common
var gulp = require('gulp');
var path = require('path');

// error
var notify = require('gulp-notify');

// server
var gls = require('gulp-live-server');

gulp.task('server', function() {

  var env = process.env;
  env.NODE_ENV = process.env.NODE_ENV || 'development';

  var server = gls('bin/www', env, false);
  server.start();

  gulp.watch(['bin/www', 'config/**/*.coffee'], [server.start]);
});

gulp.task('default', ['server']);
