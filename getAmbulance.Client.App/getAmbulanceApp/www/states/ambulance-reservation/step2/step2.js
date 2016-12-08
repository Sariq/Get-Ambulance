

angular.module('starter.controllers').controller('AmbulanceStep2Ctrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {
    $scope.form = {};
    $scope.continueToStep3 = function () {
        ReservationService.mergeToFormData($scope.form);
        $state.go('app.ambulance-reservation-step3');
    }

})


