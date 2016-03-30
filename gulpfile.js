'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var KarmaServer = require('karma').Server;
var del = require('del');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ngAnnotate = require('gulp-ng-annotate');
var iife = require('gulp-iife');
var templateCache = require('gulp-angular-templatecache');
var path = require('path');
var header = require('gulp-header');
var runSequence = require('run-sequence');
var pkg = require('./package.json');

var distFolder = './dist';

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.repository.url %>',
  ' * @license <%= pkg.license %>',
  ' * @author <%= pkg.author %>',
  ' */',
  ''].join('\n');

gulp.task('styles', function () {
  return gulp.src('./src/*.scss')
    .pipe(concat('ngColorInput.css'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(distFolder))
    .pipe(cssnano({safe: true}))
    .pipe(rename('ngColorInput.min.css'))
    .pipe(gulp.dest(distFolder))
    .pipe(browserSync.stream());
});

gulp.task('test', function (done) {
  new KarmaServer({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {
  new KarmaServer({
    configFile: path.join(__dirname, 'karma.conf.js')
  }, done).start();
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: ['./demo'],
      routes: {
        '/node_modules': './node_modules',
        '/dist': './dist'
      }
    }
  });

  gulp.watch(path.join(distFolder, '*.html')).on('change', browserSync.reload);
  gulp.watch(path.join(distFolder, '*.js')).on('change', browserSync.reload);
});

gulp.task('partials', function () {
  return gulp.src('./src/*.html')
    .pipe(templateCache('templateCache.js', {
      module: 'ngColorInput',
      templateHeader: 'angular.module(\'<%= module %>\'<%= standalone %>).run(function($templateCache) {',
      templateBody: '$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
      templateFooter: '});'
    }))
    .pipe(gulp.dest(distFolder));
});

gulp.task('concat', ['partials'], function () {
  return gulp.src(
    [
      'src/index.js',
      'dist/templateCache.js',
      'src/colorInput.js',
      'src/colorSelector.js'
    ])
    .pipe(concat('ngColorInput.js'))
    .pipe(iife({
      params: ['angular', 'tinycolor'],
      args: ['window.angular', 'window.tinycolor']
    }))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(distFolder));
});

gulp.task('uglify', ['concat'], function () {
  return gulp.src(path.join(distFolder, 'ngColorInput.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(rename('ngColorInput.min.js'))
    .pipe(gulp.dest(distFolder));
});

gulp.task('clean', function () {
  return del(path.join(distFolder, '**/*'));
});

gulp.task('build', function () {
  runSequence('clean', ['styles', 'uglify'], 'post-build');
});

gulp.task('post-build', function () {
  return del(path.join(distFolder, 'templateCache.js'));
});
