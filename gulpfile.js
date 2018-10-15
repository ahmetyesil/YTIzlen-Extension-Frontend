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
        './src/assets/scss/*.scss',
        './src/assets/css/*.css',])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('./src/dist/css/style.css'))
        .pipe(css_min())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src([
        './src/assets/fonts/*.{woff,woff2,svg,eot,ttf,otf}',
    ])
        .pipe(gulp.dest('./src/dist/fonts/'))
        .pipe(browserSync.stream());
});

gulp.task('webfonts', function () {
    return gulp.src([
        './src/assets/webfonts/*.{woff,woff2,svg,eot,ttf,otf}',
    ])
        .pipe(gulp.dest('./src/dist/webfonts/'))
        .pipe(browserSync.stream());
});

gulp.task('jshint', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/jquery-validation/dist/jquery.validate.min.js',
        './src/assets/js/model/google-session.js',
        './src/assets/js/model/session.js',
        './src/assets/js/constant/http-headers-constant.js',
        './src/assets/js/constant/site-info-constant.js',
        './src/assets/js/constant/api-urls-constant.js',
        './src/assets/js/constant/environment-constant.js',
        './src/assets/js/service/common/storage-service.js',
        './src/assets/js/service/common/routing-service.js',
        './src/assets/js/service/api/rest-api-service.js',
        './src/assets/js/service/api/api-service.js',
        './src/assets/js/service/common/loading-service.js',
        './src/assets/js/service/common/alert-service.js',
        './src/assets/js/service/common/http-status-service.js',
        './src/assets/js/index.js'
    ])
        .pipe(concat('./src/dist/js/all.js'))
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
    gulp.watch('./src/assets/js/**/*.js', ['jshint']);
    gulp.watch('./src/assets/css/**/*.css',['sass-watch']);
    gulp.watch('./src/assets/scss/**/*.scss',['sass-watch']);
});

gulp.task('build', function () {

});

gulp.task('serve', function() {
    gulp.start('sass');
    gulp.start('fonts');
    gulp.start('webfonts');
    gulp.start('jshint');
});




