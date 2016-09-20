module.exports = function() {
    var client = './';
    var clientApp = client + 'app/';
    var temp = './styles/';

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
        css: temp + 'styles.css',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }

    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
