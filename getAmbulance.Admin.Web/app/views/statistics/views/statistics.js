'use strict';

angular.module('sbAdminApp')
  .controller('StatisticsCtrl', function ($scope, ngDialog, WhiteLabelService, ReservationService, UserManagerService, $stateParams, $filter, StatisticsService) {
      $scope.reservationStatusArr = [];
      $scope.reservationTypeArr = [];
      $scope.serviceType = $stateParams.type;
      $scope.reservationTypeArr.push($scope.serviceType);
      $scope.monthNames = StatisticsService.getMonthsArray();
      $scope.supportedService = WhiteLabelService.getSupportedServicesByType($scope.serviceType);
      // $scope.supportedAreas = WhiteLabelService.getSupportedAreasByServiceType($scope.serviceType);

      $scope.initChart = function (chartObject) {

      }
      $scope.convertMonthToNumber = function (chartObject) {
          $scope.data = StatisticsService.convertMonthToNumber($scope.reservationsList,new Date().getYear());
      }
      $scope.convertDayToNumber = function (chartObject) {
          $scope.data = StatisticsService.convertDayToNumber($scope.reservationsList);
      }
      $scope.initReservationCountView = function () {
          $scope.convertMonthToNumber();
      }
      $scope.initReservationStatusView = function () {
          $scope.statusChart = StatisticsService.groupByStatus($scope.reservationsList);
          $scope.statusChart.colors = ['#fdb45c', '#46bfbd', '#f7464a', '#57c059', '#ff0000'];
          $scope.statusChart.series = $scope.statusChart.labels;
      }
      $scope.initReservationVBillView = function () {
                $scope.billChart = {};
                $scope.billChart.data = StatisticsService.getBillData($scope.reservationsList, new Date().getYear());
      }
      $scope.initSupportView = function () {
          $scope.initReservationCountView();
          $scope.initReservationStatusView();
          $scope.initReservationVBillView();

      }
      $scope.getReservations = function () {
          ReservationService.getReservations($scope.reservationStatusArr, $scope.reservationTypeArr).then(function (res) {
              $scope.reservationsList = res.data;
              $scope.initSupportView();
          }, function (err) {
              console.log(err);
          });
      }
      $scope.getReservations();

      $scope.chartBarClick = function (points, evt) {
          console.log(points, evt);
          points[0]._model.label
      };
      $scope.isSupportRole = UserManagerService.isSupportRole();
      if (!$scope.isSupportRole) {
    
          
      } else {
         
      }

  });
