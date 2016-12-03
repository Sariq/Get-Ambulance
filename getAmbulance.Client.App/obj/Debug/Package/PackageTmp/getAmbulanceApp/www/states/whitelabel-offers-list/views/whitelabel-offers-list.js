

angular.module('starter.controllers').controller('WhiteLabelOffersListCtrl', function ($scope, $ionicModal, ReservationService, localStorageService) {
    $scope.items = [{ img: 'img/mada-logo.jpg', title: 'מאדא', description: '', price: '300' }];
    $scope.ambulancePriceOffersList = localStorageService.get('ambulancePriceOffersList');
    $scope.setSelectedOffer = function (whiteLabelOffer) {
        ReservationService.setWhiteLabelOffer(whiteLabelOffer);
        ReservationService.sendReservationData();
      //  $state.go('app.client-information')
    }
  
})


