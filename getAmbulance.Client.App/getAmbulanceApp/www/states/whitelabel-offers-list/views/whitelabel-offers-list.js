

angular.module('starter.controllers').controller('WhiteLabelOffersListCtrl', function ($scope, $ionicModal, ReservationService, localStorageService) {
    $scope.reservationForm = localStorageService.get('reservationFormData');

    $scope.getAmbulanceOffersList = function () {
        ReservationService.getAmbulanceOffersList($scope.reservationForm).then(function (res) {
            $scope.ambulancePriceOffersList = res.data;
            localStorageService.set('ambulancePriceOffersList', $scope.ambulancePriceOffersList);
        });
    }

    $scope.getMedicalTherapistOffersList = function () {
        ReservationService.getMedicalTherapistOffersList($scope.reservationForm).then(function (res) {
            $scope.ambulancePriceOffersList = res.data;
            localStorageService.set('ambulancePriceOffersList', $scope.ambulancePriceOffersList);
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
         //   $state.go('app.stairs-assistance-reservation-step2');
            break;
    }




   // $scope.ambulancePriceOffersList = localStorageService.get('ambulancePriceOffersList');
    $scope.setSelectedOffer = function (whiteLabelOffer) {
        ReservationService.setWhiteLabelOffer(whiteLabelOffer);
        ReservationService.sendReservationData();
      //  $state.go('app.client-information')
    }
  
})


