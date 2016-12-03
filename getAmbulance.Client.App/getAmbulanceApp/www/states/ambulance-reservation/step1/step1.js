

angular.module('starter.controllers').controller('Step1Ctrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {

    $scope.form = {};
    $scope.continueToStep2 = function () {
        ReservationService.mergeToFormData($scope.form);
        
       
        $state.go('app.reservation-step2');
    }

})


