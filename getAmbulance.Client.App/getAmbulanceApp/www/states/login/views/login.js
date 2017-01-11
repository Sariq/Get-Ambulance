

angular.module('starter.controllers').controller('LogInCtrl', function ($ionicPopup,$scope, authService, ngAuthSettings, $state, LogInService) {

    $scope.loginForm = {
        userName: "",
        password: ""
    };

    $scope.message = "";


    $scope.sendCodeToClientByPhone = function () {
        $scope.myPopup = $ionicPopup.show({
            templateUrl: 'popUp/confirm-phone-number/confirm-phone-number.html',
            //subTitle: 'Please use normal things',
            scope: $scope

        })
    }

    $scope.sendCodeToClientByPhone2 = function () {
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


