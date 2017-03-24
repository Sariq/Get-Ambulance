

angular.module('starter.controllers').controller('MedicalTherapistStep3Ctrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state, $timeout) {
    $scope.headerInfoText = 'Header_Info_Common_Text';
    var storageFormData = ReservationService.getReservationFormData();
    
        if (storageFormData) {
            $scope.form = storageFormData;
         
        } else {
            $scope.form = {};
        }
  
  
    

    $scope.validateCheckBox = function () {
        var flag = false;
        if ($scope.form.Service_Options){
        angular.forEach($scope.form.Service_Options, function (value, key) {
            if (value) {
                flag= true;
            }
        })
        }
        return flag;
    }
    $scope.isCheckBoxGValid = true;
    $scope.continueToStep3 = function () {
        $scope.isCheckBoxGValid = $scope.validateCheckBox();
        if ($scope.isCheckBoxGValid) {
        ReservationService.mergeToFormData($scope.form);
        self.fullForm = localStorageService.get('reservationFormData');
        $state.go('app.whitelabel-offers-list');
        }
    }



})


