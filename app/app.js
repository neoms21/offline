var appRun = function ($stateProvider, $urlRouterProvider) {
//REPLACE
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

    Offline.options = {
        // Should we check the connection status immediatly on page load.
        checkOnLoad: false,

        // Should we monitor AJAX requests to help decide if we have a connection.
        interceptRequests: false,

        // Should we automatically retest periodically when the connection is down (set to false to disable).
    };

    Offline.on('confirmed-down', function () {
        console.log('Down');
    });

    Offline.on('confirmed-up', function () {
        console.log('Up');
    });
};

appRun.$inject = ['$stateProvider', '$urlRouterProvider'];
var app = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'ngGuid'])
    .config(appRun);