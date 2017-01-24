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
          $scope.AdditionalProperties = {};
          //$scope.AdditionalProperties.firstCol=$scope.reservation.AdditionalProperties.slice(0, ($scope.reservation.AdditionalProperties.length / 2)+1);
          //$scope.AdditionalProperties.secondCol = $scope.reservation.AdditionalProperties.slice($scope.reservation.AdditionalProperties.length / 2, $scope.reservation.AdditionalProperties.length-1);
          $scope.initItemForm();

      })

      $scope.initItemForm = function () {

          switch ($scope.reservation.Type) {
              case '1':
                  $scope.itemForm = {
                      Date: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Date'),
                      Time: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Time'),
                      Ambulance_Type: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Ambulance_Type'),
                      From_Address: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'From_Address'),
                      To_Address: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'To_Address'),
                      Weight: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Weight'),
                      Direction_Type: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Direction_Type'),
                      Need_Help_With_Stairs: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Need_Help_With_Stairs'),
                      distance: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'distance'),
                  }
                  break;
              case '2':
                  $scope.itemForm = {
                      Date: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Date'),
                      Time: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Time'),
                      Meeting_Address: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Meeting_Address'),
                      Current_Status: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Current_Status'),
                      Accompaniment_Location: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Accompaniment_Location'),
                      Service_Options: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Service_Options'),
                      Therapist_Stayig_Time: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Therapist_Stayig_Time'),
                      Weight: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Weight')
                  }
                  break;
              case '3':
                  $scope.itemForm = {
                      Date: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Date'),
                      Time: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Time'),
                      Meeting_Address: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Meeting_Address'),
                      Stairs_Assistance_Options: ReservationService.getValueByKey($scope.reservation.AdditionalProperties, 'Stairs_Assistance_Options')
                  }
                  break;
          }

      }


  });
