

angular.module('sbAdminApp').controller('ConfirmEmailCtrl', function ($scope, $location, RegisterService, $state, $timeout) {
  
   
    $scope.userId = $location.search().userId;
    $scope.code = $location.search().code;
    RegisterService.ConfirmEmail($scope.userId,$scope.code).then(function (res) {
        if (res.status == 200) {
            $timeout(function () {
                $state.go('login')
            });
        }
    });
    

})


