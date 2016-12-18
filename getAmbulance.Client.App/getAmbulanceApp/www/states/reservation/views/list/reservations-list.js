

angular.module('starter.controllers').controller('ReservationListCtrl', function ($scope, authService, ngAuthSettings, $state, ReservationService) {

    $scope.$on('update-reservations-list', function (event, args) {
        $scope.getReservations();
    });
    $scope.getReservations = function () {
        ReservationService.getReservations($scope.reservationStatus, $scope.reservationType).then(function (res) {
            $scope.reservationsList = res.data;
        }, function (err) {
            console.log(err);
        });
    }
    $scope.getReservations();
    $scope.$on('update-reservations-list', function (event, args) {
        $scope.getReservations();
    });

    $scope.$on('$ionicView.beforeEnter', function (e) {
       

      
        $scope.getReservations();
    
    });
})


