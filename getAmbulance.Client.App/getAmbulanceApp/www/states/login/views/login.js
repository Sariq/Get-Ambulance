

angular.module('starter.controllers').controller('LogInCtrl', function ($scope, authService, ngAuthSettings, $state) {

    $scope.loginForm = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        $scope.loginForm.userName= $scope.loginForm.Phone_Number;
        authService.login($scope.loginForm).then(function (response) {

            $state.go('app.home');

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

    $scope.sendCodeToClientByPhone = function () {
      
        authService.sendCodeToClientByPhone($scope.loginForm.Phone_Number).then(function (response) {
           // $state.go('app.home');
        },
       function (err) {
           $scope.message = err.error_description;
       });

    }

})


