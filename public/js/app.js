var angular = require('angular');
require('angular-route');

var app = angular.module('webglRocks', ['ngRoute'])

    .constant('VERSION', require('../../package.json').version)

    .config(function ($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
                templateUrl: 'partials/views/home.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
            })
            .when('/admin/', {
                templateUrl: 'partials/views/admin.html',
                controller: 'AdminController',
                controllerAs: 'adminCtrl',
            })
            .when('/404', {
                templateUrl: 'partials/views/404.html'
            })
            .when('/posts/', {
                templateUrl: 'partials/views/archive.html',
                controller: 'ArchiveController',
                controllerAs: 'archiveCtrl',
                resolve: {
                    pageContents: ['BlogAPI', function(BlogAPI) {
                        return BlogAPI.getPostArchive();
                    }]
                }
            })
            .when('/post/:id', {
                templateUrl: 'partials/views/post.html',
                controller: 'PostController',
                controllerAs: 'postCtrl',
                resolve: {
                    pageContents: ['$route', 'BlogAPI', function($route, BlogAPI) {
                        return BlogAPI.getPost($route.current.params.id);
                    }]
                }
            })
            .when('/:id', {
                templateUrl: function (urlattr) {
                    return 'partials/views/pages/' + urlattr.id + '.html';
                },
                controller: 'PageController',
                controllerAs: 'pageCtrl',
                resolve: {
                    pageContents: ['$route', 'BlogAPI', function($route, BlogAPI) {
                        return BlogAPI.getPage($route.current.params.id);
                    }]
                }
            })
            .otherwise({
                redirectTo: '/404',
            });

        $locationProvider.html5Mode(true);

    })
    .run(function ($rootScope, $location) {
        $rootScope.pageTitle = "";
        $rootScope.pageDescription = "";
        $rootScope.$on('$routeChangeError', function (event, current, previous, error) {
            if (error.status === 404) {
                $location.path('/404');
            }
        });
    });

require('./services');
require('./controllers');
require('./directives');


