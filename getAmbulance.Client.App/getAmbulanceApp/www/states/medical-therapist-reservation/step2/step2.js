

angular.module('starter.controllers').controller('MedicalTherapistStep2Ctrl', function ($filter,$scope, $ionicModal, ReservationService, localStorageService, $state) {
    $scope.headerInfoText = 'Header_Info_Common_Text';
    var storageFormData = ReservationService.getReservationFormData();
    if (storageFormData) {
        $scope.form = storageFormData;
    } else {
        $scope.form = {};
    }
    $scope.Meeting_Address = null;
    $scope.continueToStep3 = function () {
        ReservationService.mergeToFormData($scope.form);
        $state.go('app.medical-therapist-reservation-step3');
    }
    $scope.onChange = function (val) {

        if (val < 10) {
            val = '0' + val;
        }
    }

    $scope.autocompleteOptions = {
        //componentRestrictions: { country: 'il' }
    }
    $scope.$on('g-places-autocomplete:select', function (event, args) {
        $scope.$apply();
    });
    
    

})
