var angular = require('angular');
require('angular-route');

var app = angular.module('webglRocks', [ 'ngRoute' ])

.constant('VERSION', require('../../package.json').version)

.config(function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
            templateUrl: 'partials/views/home.html',
            controller: 'HomeController',
            controllerAs: 'HomeCtrl',
        })
        .when('/about-me', {
            templateUrl: 'partials/views/about-me.html',
            controller: 'AboutMeController',
            controllerAs: 'AboutMeCtrl',
        })
        .when('/random-points', {
            templateUrl: 'partials/views/random-points.html',
            controller: 'RandomPointsController',
            controllerAs: 'RandomPointsCtrl',
        })
        .otherwise({
            redirectTo: '/',
        });

    $locationProvider.html5Mode(true);

});

require('./services');
require('./controllers');
require('./directives');
require('pixi.js');


