var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var csso = require('gulp-csso');

gulp.task('sass', function () {
	return gulp.src('./sass/styles.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(csso())
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['watch']);