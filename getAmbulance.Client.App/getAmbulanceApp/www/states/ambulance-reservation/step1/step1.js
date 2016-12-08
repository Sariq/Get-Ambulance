

angular.module('starter.controllers').controller('Step1Ctrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {

    $scope.form = {};
    $scope.continueToStep2 = function () {
        ReservationService.mergeToFormData($scope.form);
       
        switch (localStorageService.get('reservationType')) {
            case '1':
                $state.go('app.ambulance-reservation-step2');
                break;
            case '2':
                $state.go('app.medical-therapist-reservation-step2');
                break;
            case '3':
                $state.go('app.stairs-assistance-reservation-step2');
                break;
        }
       
      
    }

})


