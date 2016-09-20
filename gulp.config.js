module.exports = function () {
    var client = './';
    var clientApp = client + 'app/';
    var styles = './styles/';
    var temp = './.tmp/';

    var config = {
        temp: temp,

        /**
         * Files paths
         */
        alljs: [
            '**/*.js'
        ],
        client: client,
        build: './build/',
        htmltemplates: clientApp + '**/*.html',
        css: styles + 'styles.css',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.js',
            clientApp + '.tmp/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'app/'
            }
        },
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }

    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
