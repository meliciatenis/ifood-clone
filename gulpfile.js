const gulp = require('gulp');
const pug = require('gulp-pug');
const scss = require('gulp-sass');
const watch = require('gulp-watch');

function ignoreError(error) {
    console.error(error.toString())
    this.emit('end')
}

function compilePug() {
    return gulp
        .src('src/**/*.pug')
        .pipe(pug())
        .on('error', ignoreError)
        .pipe(gulp.dest('dist'))
}

function compileSass() {
    return gulp
        .src('src/**/*.scss')
        .pipe(scss())
        .on('error', ignoreError)
        .pipe(gulp.dest('dist'))
}

gulp.task('pug', compilePug)
gulp.task('sass', compileSass)

gulp.task('watch-pug', function() {
    watch('src/**/*.pug', compilePug)
})

gulp.task('watch-sass',function(){
    watch('src/**/*.scss',compileSass)
})

gulp.task('build', gulp.series('pug', 'sass'))
gulp.task('dev', gulp.parallel('pug', 'sass', 'watch-pug', 'watch-sass'))