var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    consolidate = require('gulp-consolidate'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    gulpUtil = require('gulp-util'),
		sass = require('gulp-sass');

var paths = {
	css: { src: ['scss/*.scss'], dest: '../Content/' },
	js: { src: ['js/**/*.js'], dest: '../Scripts/', watch: '../Scripts/**/*.js' },
	content: ['../bin/*.*', '../*.aspx', '../*.ascx', '../*.Master']
};

gulp.task('css', function() {
	gulp
	.src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', gulpUtil.log))
        .pipe(autoprefixer({browsers: ['last 2 version', 'ie 11']}).on('error', gulpUtil.log))
        .pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(paths.css.dest))	
	.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('js', function() {
	gulp
		.src(paths.js.src)
		.pipe(gulp.dest(paths.js.dest));

});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'http://localhost:52015'
    });
});

gulp.task('watch', function() {
	gulp.watch(paths.css.src, ['css']);
	gulp.watch(paths.js.src, ['js']);
	gulp.watch(paths.js.watch).on('change', browserSync.reload);
	gulp.watch(paths.content).on('change', browserSync.reload);
});


gulp.task('default', ['browser-sync', 'watch', 'css', 'js']);