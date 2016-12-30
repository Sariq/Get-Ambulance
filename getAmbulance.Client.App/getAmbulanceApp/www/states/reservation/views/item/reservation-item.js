
angular.module('starter.controllers').controller('ReservationItemCtrl', function ($scope, authService, ngAuthSettings, $state, ReservationService) {

   

    $scope.initItemForm = function () {
        $scope.itemForm = {

            Provider_Name: $scope.selectedReservation.whiteLabelData.name,
            Provider_Phone_Number: $scope.selectedReservation.whiteLabelData.phoneNumber,
            Date: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Date'),
            Time: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Time')
        }
    }
   
    $scope.backToReservationsList = function () {
        $state.go('app.reservation-list');
    }
    $scope.$on('$ionicView.beforeEnter', function (e) {
        $scope.selectedReservation = ReservationService.getSelectedReservation();
        $scope.initItemForm();
    });
})


