

angular.module('starter.controllers').controller('VerfiyCodeCtrl', function ($scope, authService, ngAuthSettings, $state, LogInService, UserProfileService, CommonService) {

    $scope.loginForm = {

    };
    $scope.showUserInfoInputs = false;
    $scope.message = "";
    $scope.error = {};
    $scope.error.showMessage = false;
    $scope.logInData = LogInService.getLogInData();
    $scope.isUpdateUserProfile = false;
    //if ($scope.logInData.Client_Data.User_Reg_Status == '1') {
    //    $scope.showUserInfoInputs = true;
    //} else {

        $scope.loginForm.Full_Name = $scope.logInData.Client_Data.Full_Name;
        $scope.loginForm.Id_Number = $scope.logInData.Client_Data.Id_Number;
        $scope.loginForm.Date_Of_Birth = $scope.logInData.Client_Data.Date_Of_Birth;
        if (!$scope.loginForm.Full_Name || !$scope.loginForm.Id_Number || !$scope.loginForm.Date_Of_Birth) {
            $scope.isUpdateUserProfile = true;
        }

       
   // }

    $scope.login = function () {
        $scope.error.showMessage = false;
        $scope.loginForm.userName = $scope.logInData.Phone_Number;
        CommonService.showLoader();
        authService.login($scope.loginForm).then(function (response) {
            CommonService.hideLoader();
            $scope.userProfile = UserProfileService.getUserProfileLocal();
            if ($scope.isUpdateUserProfile) {
                var data = { "User_Id": $scope.userProfile._id, "Full_Name": $scope.loginForm.Full_Name, "Id_Number": $scope.loginForm.Id_Number, "Date_Of_Birth": $scope.loginForm.Date_Of_Birth }
                UserProfileService.updateUserProfile(data).then(function (res) {
                    UserProfileService.RefreshUserProfile();
                });
            }

            $state.go('app.home');
          console.log(UserProfileService.getUserProfileLocal())
           

        },
         function (err) {
             CommonService.hideLoader();
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


