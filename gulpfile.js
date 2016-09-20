// Include Gulp
var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files']
    // replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = 'www/public/';
//
// gulp.task('js', function () {
//
//     var jsFiles = ['app.js', 'js/*',];
//     console.log(plugins.mainBowerFiles('**/*.js'));
//     gulp.src(plugins.mainBowerFiles('**/*.js').concat(jsFiles))
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(plugins.concat('main.js'))
//         .pipe(plugins.minify().on('error', gutil.log))
//         .pipe(gulp.dest(dest + 'js'));
// });


gulp.task('inject', ['wiredep'], function () {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css), {addRootSlash: false}))
        .pipe(gulp.dest(config.client));
});

gulp.task('wiredep', function () {
    // log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), {addRootSlash: false}))
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize',  function () {

    var assets = $.useref({searchPath: './', restore:true});
    //var templateCache = config.temp + config.templateCache.file;
    var cssFilter = $.filter('styles/*.css', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});
    return gulp
        .src(config.index)
       // .pipe($.plumber())
        // .pipe($.inject(
        //     gulp.src(templateCache, {read: false}), {
        //         starttag: '<!-- inject:templates:js -->'
        //     }))
        .pipe($.useref())
        // .pipe(cssFilter)
        // .pipe($.csso())
        //  .pipe(jsFilter)
        //  .pipe($.uglify())
        //  .pipe($.useref())
        .pipe(gulp.dest('dist'));
});


//gulp.task('default', ['wired']);