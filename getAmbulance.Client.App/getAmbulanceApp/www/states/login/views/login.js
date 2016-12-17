

angular.module('starter.controllers').controller('LogInCtrl', function ($scope, authService, ngAuthSettings, $state) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {

            $state.go('app.home');

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

})


