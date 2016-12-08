

angular.module('starter.controllers').controller('AmbulanceStep3Ctrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {
    $scope.form = {};


    $scope.continueToStep3 = function () {
        ReservationService.mergeToFormData($scope.form);
        self.fullForm = localStorageService.get('reservationFormData');

        ReservationService.getDistance(self.fullForm, getDistanceCallback);
        //   $scope.form.address.distance = 23;

    }
    $scope.getAmbulanceList = function () {
        console.log($scope.form)
    }

    function getDistanceCallback(response, status) {
        self.fullForm.distance = (response.rows[0].elements[0].distance.value) / 1000;
        
        localStorageService.set('reservationFormData', self.fullForm);
        $state.go('app.whitelabel-offers-list');
    }
})


