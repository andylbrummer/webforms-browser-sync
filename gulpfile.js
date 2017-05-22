var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

var paths = {
	css: ['site/testSite/Content/*.css'],
	js: ['site/testSite/Scripts/**/*.js']
}

gulp.task('css-reload', function() {
	gulp.src(paths.css).pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'http://localhost:52015'
    });
});

gulp.task('watch', function() {
	gulp.watch(paths.css, ['css-reload']);
	gulp.watch(paths.js).on('change', browserSync.reload);
});


gulp.task('default', ['browser-sync', 'watch']);