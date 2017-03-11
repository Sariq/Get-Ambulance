

angular.module('sbAdminApp').controller('ResetPasswordCtrl', function ($scope, $location, RegisterService, $state, $timeout) {
  
   
    $scope.userId = $location.search().userId;
    $scope.code = $location.search().code;

    $scope.resetPassForm = {
        userId: $scope.userId,
        code: $scope.code,
        Password: $scope.Password,
        ConfirmPassword: $scope.ConfirmPassword
    };
    $scope.ResetPassword = function () {
        RegisterService.ResetPassword($scope.resetPassForm).then(function (res) {
            if (res.status == 200) {
                $timeout(function () {
                    $state.go('login')
                });
            }
        });
    }
    
    

})


