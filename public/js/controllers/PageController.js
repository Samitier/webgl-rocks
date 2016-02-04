module.exports= function($rootScope, $scope, pageContents) {
    this.init = function() {
        console.log(pageContents);
        $rootScope.pageTitle = pageContents.data.title;
        $rootScope.pageDescription = dat.data.metaDescription;
    }
    this.init();
}