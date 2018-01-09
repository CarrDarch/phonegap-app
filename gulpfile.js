var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin')
	gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

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

// Javascript
gulp.task('js', function(){
    return gulp.src(['./www/src/js/**/*.js', './www/src/spec/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gp_rename('uglify.js'))
        .pipe(gp_uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/dist/js'));
});

gulp.task('default', ['sass', 'images', 'js'], function() {
	gulp.watch(['./www/src/sass/**/*.scss'], ['sass']);
	gulp.watch(['./www/src/img/*'], ['images']);
	gulp.watch(['./www/src/js/**/*.js', './www/src/spec/**/*.js'], ['js']);
});