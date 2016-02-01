var angular = require('angular');
require('angular-route');

var app = angular.module('webglRocks', [ 'ngRoute' ])

.constant('VERSION', require('../../package.json').version)

.config(function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
            templateUrl: 'partials/views/home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl',
        })
        .when('/post/:id', {
            templateUrl: 'partials/views/post.html',
            controller: 'PostController',
            controllerAs: 'postCtrl',
        })
        .when('/:id', {
            templateUrl: function(urlattr){
                return 'partials/views/' + urlattr.id + '.html';
            },
            controller: 'PageController',
            controllerAs: 'pageCtrl',
        })
        .otherwise({
            redirectTo: '/',
        });

    $locationProvider.html5Mode(true);

});

require('./services');
require('./controllers');
require('./directives');


