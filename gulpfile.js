var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin');

// Styles
gulp.task('sass', function () {
 return gulp.src('./www/src/sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./www/dist/css'));
});

// Images
gulp.task('images', function() {
    return gulp.src('./www/src/img/*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('./www/dist/images'));
});

gulp.task('default', ['sass', 'images'], function() {
	gulp.watch(['./www/src/sass/**/*.scss'], ['sass']);
	gulp.watch(['./www/src/img/*'], ['images']);
});