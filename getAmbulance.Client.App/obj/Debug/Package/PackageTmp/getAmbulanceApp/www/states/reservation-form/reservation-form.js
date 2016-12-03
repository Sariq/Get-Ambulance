

angular.module('starter.controllers').controller('ReservationCtrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {

    $scope.form = { currentPlace: '', address: {}, date: {},weight:'',patientStatus:'' };
    
    $scope.continueToStep2 = function () {
        console.log($scope.form)
        ReservationService.getDistance($scope.form.address, getDistanceCallback);
     //   $scope.form.address.distance = 23;
      
    }
    $scope.getAmbulanceList = function () {
        console.log($scope.form)
    }
  
    function getDistanceCallback(response, status) {
        $scope.form.address.distance = (response.rows[0].elements[0].distance.value) / 1000;
         ReservationService.getAmbulanceOffersList($scope.form).then(function (res) {
             $scope.ambulancePriceOffersList = res.data;
             localStorageService.set('ambulancePriceOffersList', $scope.ambulancePriceOffersList);
             ReservationService.setReservationData($scope.form.address);
             $state.go('app.whitelabel-offers-list');
        });
      
    }
})


