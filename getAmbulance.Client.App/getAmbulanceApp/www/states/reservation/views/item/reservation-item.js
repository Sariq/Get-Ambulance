
angular.module('starter.controllers').controller('ReservationItemCtrl', function (WhiteLabelService,$scope, authService, ngAuthSettings, $state, ReservationService, $stateParams) {
    $scope.headerInfoText = 'Header_Info_Common_Text';
    $scope.selectedReservation = {};

    $scope.initItemForm = function () {
       
        switch ($scope.selectedReservation.Type) {
            case '1':
                $scope.itemForm = {
                    Provider_Name: $scope.selectedReservation.whiteLabelData.name,
                    Provider_Phone_Number: $scope.selectedReservation.whiteLabelData.phoneNumber,
                    Date: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Date'),
                    Time: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Time'),
                    From_Address: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'From_Address'),
                    To_Address: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'To_Address'),
                    Ambulance_Type: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Ambulance_Type')
                }
                break;
            case '2':
                $scope.itemForm = {
                    Provider_Name: $scope.selectedReservation.whiteLabelData.name,
                    Provider_Phone_Number: $scope.selectedReservation.whiteLabelData.phoneNumber,
                    Date: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Date'),
                    Time: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Time'),
                }
                break;
            case '3':
                $scope.itemForm = {
                    Provider_Name: $scope.selectedReservation.whiteLabelData.name,
                    Provider_Phone_Number: $scope.selectedReservation.whiteLabelData.phoneNumber,
                    Date: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Date'),
                    Time: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Time'),
                }
                break;
        }
     
    }
   
    $scope.backToReservationsList = function () {
        $state.go('app.reservation-list');
    }
    $scope.$on('$ionicView.beforeEnter', function (e) {

        if ($stateParams.reservationId) {
            ReservationService.getReservationById($stateParams.reservationId).then(function (res) {
   
                $scope.selectedReservation = res.data;
                $scope.selectedReservation.whiteLabelData = WhiteLabelService.convertWLIdToFullWLData($scope.selectedReservation.WhiteLabel_ID)
                $scope.initItemForm();
            });
        } else {
            $scope.selectedReservation = ReservationService.getSelectedReservation();
            $scope.initItemForm();
        }
       
      
    });
})


