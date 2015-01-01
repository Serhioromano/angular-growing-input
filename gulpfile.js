/**
 * Created by Sergey on 1/1/15.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename')

gulp.task('default', function(cb) {

	gulp.src([
		"./angular-grow.js"
	])
		.pipe(uglify())
		.pipe(rename('angular-grow.min.js'))
		.pipe(gulp.dest('./'));
});