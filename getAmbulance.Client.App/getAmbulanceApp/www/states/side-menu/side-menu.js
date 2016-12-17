

angular.module('starter.controllers').controller('SideMenu', function ($scope, authService) {


    $scope.logOut = function () {
        authService.logOut();
    }
   

})


