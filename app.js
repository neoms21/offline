console.log('in app');
var app = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngAnimate'])
    .config(function ($stateProvider, $urlRouterProvider) {
        console.log('in config');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home.html'
            })
            .state('one', {
                url: '/one',
                templateUrl: 'one.html',
                controller: 'oneController'
            } ).state('two', {
                url: '/two',
                templateUrl: 'two.html',
                controller: 'twoController'
            });
        $urlRouterProvider.otherwise('/');
    });