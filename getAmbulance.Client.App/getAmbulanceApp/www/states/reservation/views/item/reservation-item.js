
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
                    Ambulance_Type: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Ambulance_Type'),
                    Direction_Type: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Direction_Type')
                    
                }
             

                break;
            case '2':
                $scope.itemForm = {
                    Provider_Name: $scope.selectedReservation.whiteLabelData.name,
                    Provider_Phone_Number: $scope.selectedReservation.whiteLabelData.phoneNumber,
                    Date: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Date'),
                    Time: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Time'),
                    Service_Options: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Service_Options'),
                    Meeting_Address: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Meeting_Address')

                    
                    
                }
        

                break;
            case '3':
                $scope.itemForm = {
                    Provider_Name: $scope.selectedReservation.whiteLabelData.name,
                    Provider_Phone_Number: $scope.selectedReservation.whiteLabelData.phoneNumber,
                    Date: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Date'),
                    Time: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Time'),
                    Meeting_Address: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Meeting_Address'),
                    Stairs_Assistance_Options: ReservationService.getValueByKey($scope.selectedReservation.AdditionalProperties, 'Stairs_Assistance_Options')
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

    $scope.chooseOtherProvider = function () {
        ReservationService.setReservationFormData($scope.selectedReservation);
        ReservationService.setReservationType($scope.selectedReservation.Type);
        ReservationService.convertFormToOfferRequest()
        $state.go('app.whitelabel-offers-list');
    }
})


