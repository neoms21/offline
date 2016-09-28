var appRun = function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home.html'
        })
        .state('one', {
            url: '/one',
            templateUrl: 'app/one.html',
            controller: 'oneController'
        }).state('two', {
        url: '/two',
        templateUrl: 'app/two.html',
        controller: 'twoController'
    });
    $urlRouterProvider.otherwise('/');

    Offline.on('confirmed-down', function () {
        console.log('Down');
    });

    Offline.on('confirmed-up', function () {
         console.log('Up');
    });

    // setInterval(function () {
    //     console.log('in check');
    //     Offline.check();
    // }, 5000);
};

appRun.$inject = ['$stateProvider', '$urlRouterProvider'];
var app = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngAnimate'])
    .config(appRun);