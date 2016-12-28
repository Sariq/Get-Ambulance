

angular.module('starter.controllers').controller('LogInCtrl', function ($scope, authService, ngAuthSettings, $state, LogInService) {

    $scope.loginForm = {
        userName: "",
        password: ""
    };

    $scope.message = "";


    $scope.sendCodeToClientByPhone = function () {
       
        
        authService.sendCodeToClientByPhone($scope.loginForm.Phone_Number).then(function (response) {
            var logInData = { "Phone_Number": $scope.loginForm.Phone_Number, "Client_Status": response.data };
            LogInService.setLogInData(logInData);
            $state.go('verify-code');
        },
       function (err) {
           $scope.message = err.error_description;
       });

    }

})


