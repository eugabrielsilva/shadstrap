const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const watch = require('gulp-watch');

function scripts() {
    return gulp.src([
        'src/js/globals.js',
        'src/js/dom.js'
    ])
        .pipe(concat('shadstrap.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
}

function styles() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('shadstrap.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'));
}

function watchFiles() {
    watch('src/js/*.js', {ignoreInitial: false}, scripts);
    watch('src/scss/*.scss', {ignoreInitial: false}, styles);
}

exports.default = gulp.parallel(scripts, styles);
exports.watch = gulp.series(gulp.parallel(scripts, styles), watchFiles);