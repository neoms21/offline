// Include Gulp
var gulp = require('gulp');
var del = require('del');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files']
    // replaceString: /\bgulp[\-.]/
});

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

gulp.task('replace', function () {
    gulp
        .src(['app/app.js'])
        .pipe($.replace('//REPLACE', 'asdfgh'))
        .pipe(gulp.dest('replace'))

    gulp
        .src(['app/oneController.js'])
        .pipe($.replace('//REPLACE', 'asdfgh'))
        .pipe(gulp.dest('replace'))

    // clean(config.temp);
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

gulp.task('clean-code', function (done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js',
        config.build + 'css/**/*.css'
    );
    clean(files, done);
});

gulp.task('templatecache', ['clean-code'], function () {
     return gulp;
    //     .src(config.htmltemplates)
    //     .pipe($.minifyHtml({empty: true}))
    //     .pipe($.angularTemplatecache(
    //         config.templateCache.file,
    //         config.templateCache.options
    //     ))
    //     .pipe(gulp.dest(config.temp));
});

gulp.task('optimize', ['templatecache'], function () {

    var templateCache = config.temp + config.templateCache.file;
    return gulp
        .src(config.index)
        .pipe($.inject(
            gulp.src(templateCache, {read: false}), {
                starttag: '<!-- inject:templates:js -->'
            }))
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest(config.build));
});

function clean(path, done) {
    console.log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
    done();
}

//gulp.task('default', ['wired']);