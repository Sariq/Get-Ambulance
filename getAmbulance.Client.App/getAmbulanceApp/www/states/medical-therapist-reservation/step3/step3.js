

angular.module('starter.controllers').controller('MedicalTherapistStep3Ctrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {
    $scope.headerInfoText = 'Header_Info_Common_Text';
    $scope.form = {};


    $scope.continueToStep3 = function () {
        ReservationService.mergeToFormData($scope.form);
        self.fullForm = localStorageService.get('reservationFormData');
        $state.go('app.whitelabel-offers-list');
    }



})


