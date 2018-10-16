let gulp = require('gulp');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let css_min = require('gulp-cssmin');
let rename = require('gulp-rename');
let jshint = require('gulp-jshint');
let minify = require('gulp-minify');
let browserSync = require('browser-sync').create();


gulp.task('sass', function () {
    return gulp.src([
        './assets/scss/*.scss',
        './assets/css/*.css',])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('./dist/build/css/style.css'))
        .pipe(css_min())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src([
        './assets/fonts/*.{woff,woff2,svg,eot,ttf,otf}',
    ])
        .pipe(gulp.dest('./dist/build/fonts/'))
        .pipe(browserSync.stream());
});

gulp.task('webfonts', function () {
    return gulp.src([
        './assets/webfonts/*.{woff,woff2,svg,eot,ttf,otf}',
    ])
        .pipe(gulp.dest('./dist/build/webfonts/'))
        .pipe(browserSync.stream());
});

gulp.task('jshint', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/jquery-validation/dist/jquery.validate.min.js',
        './assets/js/model/google-session.js',
        './assets/js/model/session.js',
        './assets/js/constant/http-headers-constant.js',
        './assets/js/constant/site-info-constant.js',
        './assets/js/constant/api-urls-constant.js',
        './assets/js/constant/environment-constant.js',
        './assets/js/service/common/storage-service.js',
        './assets/js/service/common/routing-service.js',
        './assets/js/service/api/rest-api-service.js',
        './assets/js/service/api/api-service.js',
        './assets/js/service/common/loading-service.js',
        './assets/js/service/common/alert-service.js',
        './assets/js/service/common/http-status-service.js',
        './assets/js/index.js'
    ])
        .pipe(concat('./dist/build/js/all.js'))
        .pipe(minify())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('sass-watch', ['sass'],browserSync.reload);

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./assets/js/**/*.js', ['jshint']);
    gulp.watch('./assets/css/**/*.css',['sass-watch']);
    gulp.watch('./assets/scss/**/*.scss',['sass-watch']);
});

gulp.task('build', function () {

});

gulp.task('serve', function() {
    gulp.start('sass');
    gulp.start('fonts');
    gulp.start('webfonts');
    gulp.start('jshint');
});




