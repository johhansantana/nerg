const gulp = require('gulp'); // eslint-disable-line
const sass = require('gulp-sass'); // eslint-disable-line
const minifyCSS = require('gulp-csso'); // eslint-disable-line

gulp.task('app', () => {
  return gulp.src('./styles/**/app.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCSS())
  .pipe(gulp.dest('./static/css'))
})

gulp.task('default', ['app'])