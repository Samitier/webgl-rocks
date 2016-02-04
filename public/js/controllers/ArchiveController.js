module.exports= function($rootScope, $scope, pageContents) {
    this.init = function () {
        $scope.posts = pageContents.data;
        $rootScope.pageTitle = "My posts";
        $rootScope.pageDescription = "A list of all the posts about x and y";
    }
    this.init();
}