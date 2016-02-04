module.exports = function($http) {

    var service = {};

    var apiURI = "/api/";

    service.getPage = function(id) {
        return $http.get(apiURI + "pages/" + id);
    };

    service.getPostArchive = function() {
        return $http.get(apiURI + "posts/");
    };

    service.getPost = function(id) {
        return $http.get(apiURI + "posts/" + id);
    };

    function errorHandler(err) {
        return false;
    }

    return service;
}