var gulp = require('gulp');
var sass = require('gulp-sass');
var soy = require('gulp-soy');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');

gulp.task('soy', function () {
	gulp.src('./templates/*.soy')
		.pipe(soy())
		.pipe(concat('soy.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});

gulp.task('sass', function () {
	return gulp.src('./sass/styles.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(csso())
		.pipe(gulp.dest('./css'));
});

gulp.task('js', function () {
	return gulp.src(
		['./js/vendor/jquery-1.12.0.min.js',
			'./js/vendor/jquery.touchSwipe.min.js',
			'./js/slider.js'
		]
	)
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});

gulp.task('watch', function () {
	gulp.watch('./js/slider.js', ['js']);
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./templates/*.soy', ['soy']);
});

// Default Task
gulp.task('default', ['watch']);