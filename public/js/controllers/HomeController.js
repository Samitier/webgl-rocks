module.exports= function(BlogAPI, $scope) {

    this.init = function() {
        BlogAPI.getPage("home").then(function(dat) {
            $scope.page = dat;
        });
    }
    this.init();
}