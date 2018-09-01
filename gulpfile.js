var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

gulp.task('style', function() {
  gulp.src([
    './styles/main.scss'
  ])
    .pipe(
      sass({
        indentedSyntax: false, // Enable .sass syntax?
        imagePath: './images' // Used by the image-url helper
      })
        .on('error', sass.logError)
        .on('error', notify.onError(function (error) {
          return "Error: " + error.message;
        }))
    )
    .pipe(gulp.dest('./styles'))
    .pipe(connect.reload());
});

gulp.task('server', function() {
  connect.server({
    port: 9001,
    livereload: {
      port: 35729
    }
  });
});

gulp.task('watch', function() {
  gulp.watch(
    './styles/**/*.{sass,scss}',
    ['style']
  );
  watch('./**/*.*').pipe(connect.reload());
});

gulp.task('default', [
  'style',
  'server',
  'watch'
]);
