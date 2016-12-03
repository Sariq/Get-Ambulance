

angular.module('starter.controllers').controller('ReservationCtrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {

    $scope.form = { };
    
    $scope.continueToStep2 = function () {
        console.log($scope.form)
        ReservationService.getDistance($scope.form, getDistanceCallback);
     //   $scope.form.address.distance = 23;
      
    }
    $scope.getAmbulanceList = function () {
        console.log($scope.form)
    }
  
    function getDistanceCallback(response, status) {
        $scope.form.distance = (response.rows[0].elements[0].distance.value) / 1000;
        localStorageService.set('reservationForm', $scope.form);
        $state.go('app.whitelabel-offers-list');
    }
})


