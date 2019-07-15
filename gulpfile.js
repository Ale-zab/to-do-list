var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    gulpCache     = require('gulp-cache'),
    gulpIf        = require('gulp-if'),
    gulpImagemin  = require('gulp-imagemin'),
    gulpcleanCSS = require('gulp-clean-css'),
    gulpUglify    = require('gulp-uglify'),
    gulpUseref    = require('gulp-useref');

gulp.task('sass' , function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	});
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*.+(png|jpg|svg|gif)')
	.pipe(gulpCache(gulpImagemin()))
	.pipe(gulp.dest('dist/img/'))
});

gulp.task('minifyCss', () => {
  return gulp.src('app/css/**/*.css')
    .pipe(gulpcleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('uglify', function() {
	return gulp.src('app/js/**/*.js')
	.pipe(gulpUglify())
	.pipe(gulp.dest('dist/js/'))
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
	.pipe(gulpUseref())
	.pipe(gulp.dest('dist/'))
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts/'))
});

gulp.task('libs', function() {
	return gulp.src('app/libs/**/*')
	.pipe(gulp.dest('dist/libs/'))
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);

});

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass'));

gulp.task('run', gulp.series('useref', 'uglify', 'minifyCss', 'imagemin', 'fonts', 'libs'));