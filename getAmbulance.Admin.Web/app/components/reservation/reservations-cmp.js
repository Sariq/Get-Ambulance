'use strict';
var reservationsCmp = ['$scope', 'ReservationService', 'Reservations','$state', function ($scope, ReservationService, Reservations, $state) {
    var ctrl = this;
    $scope.$on('update-reservations-list', function (event, args) {
        ctrl.getReservations();
    });

    ctrl.getReservations=function(){
        ReservationService.getReservations(ctrl.reservationStatus, ctrl.reservationType).then(function (res) {
        ctrl.reservationsList = res.data;
    });
    }
    ctrl.getReservations();

    ctrl.acceptReservation = function (id) {
        ReservationService.setSelectedReservationId(id);
        ReservationService.acceptReservation(id).then(function (res) {
            console.log(res.data);
            $state.go('dashboard.reservation-item');
        });
    }

}]
angular.module('sbAdminApp').component('reservationsCmp', {
    bindings: {
        reservationStatus: '=',
        reservationType: '=',
   
    },
    templateUrl: 'components/reservation/reservations-cmp.html',
    controller: reservationsCmp
});