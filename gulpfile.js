const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

function styles() {
  return src([
    'assets/css/styles/normalize.css',
    'assets/css/blocks/**/*.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(dest('assets/css/dist/'));
}

function watchFiles() {
  watch([
    'assets/css/styles/normalize.css',
    'assets/css/blocks/**/*.css'
  ], styles);
}

exports.styles = styles;
exports.watch = watchFiles;
exports.default = series(styles);