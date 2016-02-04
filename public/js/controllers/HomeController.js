module.exports= function(BlogAPI, $rootScope, $scope) {

    this.init = function() {
        BlogAPI.getPage("home").then(function(dat) {
            $rootScope.pageTitle = dat.data.title;
            $rootScope.pageDescription = dat.data.metaDescription;
            $scope.page = dat.data;
        });
    }
    this.init();
}