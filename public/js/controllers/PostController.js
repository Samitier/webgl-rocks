module.exports= function($scope, pageContents) {
    this.init = function () {
        $scope.post = pageContents.data;
    }
    this.init();
}