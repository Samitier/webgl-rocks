module.exports = function($http) {

    var service = {};

    var apiURI = "/api/";

    service.getPage = function(id) {
        return $http.get(apiURI + "pages/" + id);
    };

    service.getPost = function(id) {
        return $http.get(apiURI + "posts/" + id).then(function(resp) {
            return resp.data;
        }, errorHandler);
    };

    function errorHandler(err) {
        return false;
    }

    return service;
}