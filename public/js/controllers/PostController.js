module.exports= function($rootScope, $scope, pageContents) {
    this.init = function () {
        $scope.post = pageContents.data;
        $rootScope.pageTitle = pageContents.data.title;
        $rootScope.pageDescription = pageContents.data.metaDescription;
    }
    this.init();
}