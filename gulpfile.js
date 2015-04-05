'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  indexJs: ['./src/index.js'],
  indexHtml: ['./src/index.html']
};

gulp.task('clean', function(done) {
  del(['./dist', 'index.html'], done);
});

gulp.task('browserify', function() {
  return browserify({
      debug: true
    })
    .add(paths.indexJs)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('uglify', function() {
  return gulp.src(['./dist/index.js'])
    .pipe(uglify())
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function() {
  return gulp.src(paths.indexHtml)
    .pipe(gulp.dest('./'));
});

gulp.task('build', function(callback) {
  return runSequence('clean',
              ['browserify', 'html'],
              'uglify',
              callback);
});

gulp.task('watch', ['build'], function() {
  return gulp.watch(paths.indexHtml.concat(paths.indexJs), ['build']);
});

gulp.task('default', ['watch']);
