

angular.module('starter.controllers').controller('UserProfileCtrl', function ($scope, authService, ngAuthSettings, $state, UserProfileService, $filter) {
    $scope.userProfile = UserProfileService.getUserProfileLocal();
    $scope.userProfile.Date_Of_Birth = new Date($scope.userProfile.Date_Of_Birth);
    $scope.updateUserProfile = function () {
       
        var data = { "User_Id": $scope.userProfile._id, "Full_Name": $scope.userProfile.Full_Name, "Id_Number": $scope.userProfile.Id_Number, "Date_Of_Birth": $scope.userProfile.Date_Of_Birth }
            UserProfileService.updateUserProfile(data).then(function (res) {
                UserProfileService.RefreshUserProfile();
            });
     
    }

    var initMinMaxDate = function () {
        $scope.minDate = new Date();
        $scope.minDate.setYear($scope.minDate.getFullYear() - 120);
        $scope.maxDate = new Date();
        $scope.maxDate.setYear($scope.maxDate.getFullYear() - 18);
    }
    initMinMaxDate();
});


