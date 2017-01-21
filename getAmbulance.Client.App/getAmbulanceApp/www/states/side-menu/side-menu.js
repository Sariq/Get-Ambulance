

angular.module('starter.controllers').controller('SideMenu', function ($scope, authService,UserProfileService) {
    $scope.userProfile = UserProfileService.getUserProfileLocal();


    $scope.logOut = function () {
        authService.logOut();
    }
   

})


