// vars and includes
var babel = require('gulp-babel');
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat-util');
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine');
var gutil = require('gulp-util');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var streamqueue = require('streamqueue');
var uglify = require('gulp-uglify');
var vinylPaths = require('vinyl-paths');

// *** DEV ***
gulp.task('dev', ['dev:compile'], function() {
    gulp.watch('./source/**/*.js', ['dev:js', 'test']);
});

gulp.task('dev:compile', ['dev:precompile', 'dev:js']);

gulp.task('dev:precompile', ['dev:clean']);

// deletes css and js/dist directories as well as all their contents
gulp.task('dev:clean', function() {
    var directories = [
        './dist'
    ];

    return gulp.src(directories, {read: false})
        .pipe(vinylPaths(del))
        .on('err', gutil.log);
});


// concats the JS source files into a single app.js file. Performs JS linting and ES6->ES5 transpilation
gulp.task('dev:js', ['dev:clean'], function() {
    var appFiles = './source/**/*.js',
        destPath = './dist',
        stream = streamqueue({ objectMode: true });

    stream.queue(
        gulp.src(appFiles).pipe(eslint()).pipe(eslint.format())
    );

    return stream.done()
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('tree-node.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(destPath))
});


// *** PROD ***
gulp.task('prod', ['prod:js']);

gulp.task('prod:js', ['dev:js'], function() {
    var appFiles = './source/**/*.js',
        destPath = './dist',
        stream = streamqueue({ objectMode: true });

    stream.queue(
        gulp.src(appFiles).pipe(eslint()).pipe(eslint.format())
    );

    return stream.done()
        .pipe(babel())
        .pipe(concat('tree-node.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destPath));
});


// *** TEST ***
gulp.task('test', ['test:jasmine']);

gulp.task('test:jasmine', function() {
    return gulp.src('./test/**/*.spec.js')
        .pipe(jasmine());
});