

angular.module('starter.controllers').controller('ReservationListCtrl', function ($scope, authService, ngAuthSettings, $state, ReservationService, WhiteLabelService) {

    $scope.$on('update-reservations-list', function (event, args) {
        $scope.getReservations();
    });
    $scope.getReservations = function () {
        ReservationService.getReservations($scope.reservationStatus, $scope.reservationType).then(function (res) {
            $scope.reservationsList = res.data;
            $scope.convertWLIdToFullWLData();
        }, function (err) {
            console.log(err);
        });
    }
   // $scope.getReservations();

    $scope.convertWLIdToFullWLData = function () {
        angular.forEach($scope.reservationsList, function (value, key) {
            $scope.reservationsList[key].whiteLabelData=WhiteLabelService.convertWLIdToFullWLData(value.WhiteLabel_ID)
        })
    }
    $scope.openReservationData = function (reservation) {
        ReservationService.setSelectedReservation(reservation);
        $state.go('app.reservation-item');
    }
    $scope.$on('$ionicView.beforeEnter', function (e) {
        $scope.getReservations();
    });
})


