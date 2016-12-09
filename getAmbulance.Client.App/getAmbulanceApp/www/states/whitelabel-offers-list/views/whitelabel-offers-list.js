

angular.module('starter.controllers').controller('WhiteLabelOffersListCtrl', function ($scope, $ionicModal, ReservationService, localStorageService) {
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
        ReservationService.getStairsAssistanceOffersList($scope.reservationForm).then(function (res) {
            $scope.providerPriceOffersList = res.data;
            localStorageService.set('stairsAssistanceOffersList', $scope.providerPriceOffersList);
        });
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




   // $scope.ambulancePriceOffersList = localStorageService.get('ambulancePriceOffersList');
    $scope.setSelectedOffer = function (whiteLabelOffer) {
        ReservationService.setWhiteLabelOffer(whiteLabelOffer);
        ReservationService.sendReservationData();
      //  $state.go('app.client-information')
    }
  
})


