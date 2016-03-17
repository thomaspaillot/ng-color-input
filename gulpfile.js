'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var karma = require('karma');
var rimraf = require('gulp-rimraf');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ngAnnotate = require('gulp-ng-annotate');
var iife = require('gulp-iife');
var templateCache = require('gulp-angular-templatecache');
var distFolder = './dist';

gulp.task('styles', function () {
  return gulp.src('./src/*.scss')
    .pipe(concat('ngColorInput.css'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(distFolder))
    .pipe(cssnano({safe: true}))
    .pipe(rename('ngColorInput.min.css'))
    .pipe(gulp.dest(distFolder));
});

gulp.task('karma', function () {
  var server = new karma.Server({
    configFile: './karma.conf.js',
    singleRun: true
  }, function (err) {
    process.exit(err ? 1 : 0);
  });
  return server.start();
});

gulp.task('partials', function () {
  return gulp.src('./src/**/*.html')
    .pipe(templateCache('templateCache.js', {
      module: 'ngColorInput',
      root: 'src/',
      templateHeader: 'angular.module(\'<%= module %>\'<%= standalone %>).run(function($templateCache) {',
      templateBody: '$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
      templateFooter: '});'
    }))
    .pipe(gulp.dest('./src'));
});

gulp.task('concat', ['partials'], function () {
  return gulp.src(
    [
      'src/index.js',
      'src/templateCache.js',
      'src/colorInput.js',
      'src/colorSelector.js'
    ])
    .pipe(concat('ngColorInput.js'))
    .pipe(iife())
    .pipe(gulp.dest(distFolder));
});

gulp.task('uglify', ['concat'], function () {
  return gulp.src(distFolder + '/ngColorInput.js')
    .pipe(ngAnnotate())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(rename('ngColorInput.min.js'))
    .pipe(gulp.dest(distFolder));
});

gulp.task('clean', function () {
  return gulp.src(distFolder, {read: false}).pipe(rimraf());
});

gulp.task('build', ['clean'], function () {
  return gulp.start('styles', 'uglify');
});

gulp.task('test', function () {
  return gulp.start('karma');
});
