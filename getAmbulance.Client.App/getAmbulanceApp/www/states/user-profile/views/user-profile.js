

angular.module('starter.controllers').controller('UserProfileCtrl', function ($scope, authService, ngAuthSettings, $state, LogInService) {

    $scope.loginForm = {
        userName: "",
        password: ""
    };

    $scope.message = "";


    $scope.sendCodeToClientByPhone = function () {
        var logInData = { "Phone_Number": $scope.loginForm.Phone_Number };
        LogInService.setLogInData(logInData);
        authService.sendCodeToClientByPhone($scope.loginForm.Phone_Number).then(function (response) {
            $state.go('verify-code');
        },
       function (err) {
           $scope.message = err.error_description;
       });

    }

})


