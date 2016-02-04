module.exports= function($scope, pageContents) {
    this.init = function () {
        $scope.posts = pageContents.data;
    }
    this.init();
}