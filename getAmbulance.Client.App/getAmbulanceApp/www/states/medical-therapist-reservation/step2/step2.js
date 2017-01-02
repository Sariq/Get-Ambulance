

angular.module('starter.controllers').controller('MedicalTherapistStep2Ctrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {
    $scope.form = {};
    $scope.continueToStep3 = function () {
        ReservationService.mergeToFormData($scope.form);
        $state.go('app.medical-therapist-reservation-step3');
    }
    $scope.onChange = function (val) {

        if (val < 10) {
            val = '0' + val;
        }
    }
})
