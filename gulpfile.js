const gulp = require('gulp'),
    babel = require('gulp-babel');
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect');

var htmlSources,
    sassSources,
    jsSources;

htmlSources = ['builds/development/*.html'];
sassSources = ['components/sass/style.scss'];
jsSources = ['components/scripts/*.js'];

gulp.task('connect', () => {
    connect.server({
        root: 'builds/development/',
        livereload: true
    })
});

gulp.task('sass', () => {
    gulp.src(sassSources)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('builds/development/css/'))
        .pipe(connect.reload());    
})

gulp.task('jsconcat', () => {
    gulp.src(jsSources)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js/'))
        .pipe(connect.reload());
})

gulp.task('html', () => {
    gulp.src(htmlSources)
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch('components/sass/*.scss',['sass']);
    gulp.watch(jsSources,['jsconcat']);
    gulp.watch(htmlSources,['html']);
});

gulp.task('default', ['connect','sass','jsconcat','html', 'watch']);