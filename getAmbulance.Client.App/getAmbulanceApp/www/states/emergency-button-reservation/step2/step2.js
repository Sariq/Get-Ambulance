

angular.module('starter.controllers').controller('EmergencyButtonStep2Ctrl', function ($filter,$scope, $ionicModal, ReservationService, localStorageService, $state) {
    $scope.headerInfoText = 'Header_Info_Common_Text';
    var storageFormData = ReservationService.getReservationFormData();
    if (storageFormData) {
        $scope.form = storageFormData;
    } else {
        $scope.form = {};
    }

})
