var gulp = require('gulp'),
  rename = require('gulp-rename'),
  pug = require('gulp-pug'),
  minifyCSS = require('gulp-csso'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  image = require('gulp-image');

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
});

gulp.task('scripts', function () {
  return gulp.src('./src/js/app.js')
    .pipe(webpackStream({
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      },
      externals: {
        jquery: 'jQuery'
      }
    }).on('error', notify.onError()))
    .pipe(gulp.dest('./public/js/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('html', function(){
  return gulp.src('./src/*.pug')
    .pipe(pug({
      pretty: true
    }).on('error', notify.onError()))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('./public/'));
});

gulp.task('css',function(){
  return gulp.src(['./src/css/style.scss', './src/css/media.scss'])
    .pipe(sass().on('error', notify.onError()))
    //.pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/css/'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('watch',function () {
  gulp.watch(['./src/*.pug'], gulp.series('html')).on('change', browserSync.reload);
  gulp.watch(['./src/chunks/*.pug'], gulp.series('html')).on('change', browserSync.reload);
  gulp.watch(['./src/css/*.scss'], gulp.series('css')).on('change', browserSync.reload);
  gulp.watch(['./src/js/*.js'], gulp.series('scripts')).on('change', browserSync.reload);
});

gulp.task('image', function () {
  gulp.src('src/img/**')
    .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        guetzli: false,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true // defaults to false
    }))
    .pipe(gulp.dest('./public/img/'));
});

gulp.task('default', gulp.parallel('html', 'css', 'scripts', 'watch', 'image', 'browser-sync'));