const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const urlAdjuster = require('gulp-url-adjuster');

function styles() {
  return src([
    'assets/css/styles/normalize.css',
    'assets/css/blocks/**/*.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(urlAdjuster({
      prepend: '../../',
    }))
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: ['last 2 versions', '> 1%'],
        cascade: false
      })
    ]))
    .pipe(cleanCSS())
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