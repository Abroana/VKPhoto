var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    syntax = require('postcss-scss'),
    nested = require('postcss-nested'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano');

gulp.task('js', function() {
  gulp.src('./app/js/main.js')
    /*.pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))*/
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  var processors = [
        nested,
        autoprefixer({browsers: ['> 0.5%']})
      ];
  gulp.src('app/css/style.css')
    .pipe(postcss(processors))
    //.pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

gulp.watch('app/**', ['css', 'js']);

gulp.task('default', ['css', 'js']);
