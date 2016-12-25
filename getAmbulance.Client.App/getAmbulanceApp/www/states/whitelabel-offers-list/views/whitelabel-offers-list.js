

angular.module('starter.controllers').controller('WhiteLabelOffersListCtrl', function ($scope, $ionicModal, ReservationService, localStorageService, MapService) {
    $scope.reservationForm = localStorageService.get('reservationFormData');

    $scope.getAmbulanceOffersList = function () {

        ReservationService.getAmbulanceOffersList($scope.reservationForm).then(function (res) {
            $scope.providerPriceOffersList = res.data;
            localStorageService.set('ambulancePriceOffersList', $scope.providerPriceOffersList);
        });
    }

    $scope.getMedicalTherapistOffersList = function () {
        ReservationService.getMedicalTherapistOffersList($scope.reservationForm).then(function (res) {
            $scope.providerPriceOffersList = res.data;
            localStorageService.set('medicalTherapistOffersList', $scope.providerPriceOffersList);
        });
    }

    $scope.getStairsAssistanceOffersList = function () {
        var addressList = [];
        MapService.getLatLangByAddress($scope.reservationForm.Meeting_Address).then(function (result) {
            var address = result;
            addressList.push(address);
            ReservationService.getStairsAssistanceOffersList($scope.reservationForm, addressList).then(function (res) {
                $scope.providerPriceOffersList = res.data;
                localStorageService.set('stairsAssistanceOffersList', $scope.providerPriceOffersList);
            });
        })
        
    }






    switch (localStorageService.get('reservationType')) {
        case '1':
            $scope.getAmbulanceOffersList();
            break;
        case '2':
            $scope.getMedicalTherapistOffersList();
            break;
        case '3':
            $scope.getStairsAssistanceOffersList();
            break;
    }

    $scope.showOnlySelectedOffer = function (whiteLabelOffer) {
        angular.forEach($scope.providerPriceOffersList, function (value, key) {
            if (value.whiteLabelid != whiteLabelOffer.whiteLabelid) {
                value.active = false;
            }
        })
    }


   // $scope.ambulancePriceOffersList = localStorageService.get('ambulancePriceOffersList');
    $scope.setSelectedOffer = function (whiteLabelOffer) {
        $scope.showOnlySelectedOffer(whiteLabelOffer);
        ReservationService.setWhiteLabelOffer(whiteLabelOffer);
        ReservationService.sendReservationData();
      //  $state.go('app.client-information')
    }
  
})


