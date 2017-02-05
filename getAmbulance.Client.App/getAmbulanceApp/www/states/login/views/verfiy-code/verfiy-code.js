

angular.module('starter.controllers').controller('VerfiyCodeCtrl', function ($scope, authService, ngAuthSettings, $state, LogInService, UserProfileService) {

    $scope.loginForm = {

    };
    $scope.showUserInfoInputs = false;
    $scope.message = "";
    $scope.error = {};
    $scope.error.showMessage = false;
    $scope.logInData = LogInService.getLogInData();
    if ($scope.logInData.Client_Status == '1') {
        $scope.showUserInfoInputs = true;
    }

    $scope.login = function () {
        $scope.error.showMessage = false;
        $scope.loginForm.userName = $scope.logInData.Phone_Number;
        authService.login($scope.loginForm).then(function (response) {
            $scope.userProfile = UserProfileService.getUserProfileLocal();
            if ($scope.logInData.Client_Status == '1') {
                var data = { "User_Id": $scope.userProfile._id, "Full_Name": $scope.loginForm.Full_Name, "Id_Number": $scope.loginForm.Id_Number, "Date_Of_Birth": $scope.loginForm.Date_Of_Birth }
                UserProfileService.updateUserProfile(data).then(function (res) {
                    UserProfileService.RefreshUserProfile();
                });
            }

            $state.go('app.home');
          console.log(UserProfileService.getUserProfileLocal())
           

        },
         function (err) {
             $scope.message = err.error_description;
             $scope.error.showMessage = true;
             $scope.errorMessage = 'Invalid_Code';
         });
    };

    var initMinMaxDate = function () {
        $scope.minDate = new Date();
        $scope.minDate.setYear($scope.minDate.getFullYear() - 120);
        $scope.maxDate = new Date();
        $scope.maxDate.setYear($scope.maxDate.getFullYear() - 18);
    }
    initMinMaxDate();
})


