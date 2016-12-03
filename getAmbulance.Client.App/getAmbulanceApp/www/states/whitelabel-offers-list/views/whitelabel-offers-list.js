

angular.module('starter.controllers').controller('WhiteLabelOffersListCtrl', function ($scope, $ionicModal, ReservationService, localStorageService) {
    $scope.reservationForm = localStorageService.get('reservationFormData');
    ReservationService.getAmbulanceOffersList($scope.reservationForm).then(function (res) {
        $scope.ambulancePriceOffersList = res.data;
        localStorageService.set('ambulancePriceOffersList', $scope.ambulancePriceOffersList);
    });


   // $scope.ambulancePriceOffersList = localStorageService.get('ambulancePriceOffersList');
    $scope.setSelectedOffer = function (whiteLabelOffer) {
        ReservationService.setWhiteLabelOffer(whiteLabelOffer);
        ReservationService.sendReservationData();
      //  $state.go('app.client-information')
    }
  
})


