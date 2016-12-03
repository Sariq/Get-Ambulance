'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('ReservationItemCtrl', function ($scope, ReservationService, Reservations) {
      $scope.selectedReservationId = ReservationService.getSelectedReservationId();
      ReservationService.getReservationById($scope.selectedReservationId).then(function (res) {
          $scope.reservation = res.data;
      })

  });
