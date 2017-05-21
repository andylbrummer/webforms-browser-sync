var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('default', function() {
    browserSync.init({
        proxy: 'http://localhost:52015'
    });
});