// Include Gulp
var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files']
    // replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = 'www/public/';

gulp.task('js', function () {

    var jsFiles = ['app.js', 'js/*',];
    console.log(plugins.mainBowerFiles('**/*.js'));
    gulp.src(plugins.mainBowerFiles('**/*.js').concat(jsFiles))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.minify().on('error', gutil.log))
        .pipe(gulp.dest(dest + 'js'));
});


gulp.task('default', ['js']);