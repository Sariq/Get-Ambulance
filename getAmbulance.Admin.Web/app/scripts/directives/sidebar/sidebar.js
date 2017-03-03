'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar', ['$location', function () {
      return {
          templateUrl: 'scripts/directives/sidebar/sidebar.html',
          restrict: 'E',
          replace: true,
          scope: {
          },
          controller: function ($scope, WhiteLabelService, CommonService) {

              $scope.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
              $scope.supportedServices = $scope.whiteLabel.supportedServices;
              angular.forEach($scope.supportedServices, function (value, key) {
                  value.goto = CommonService.getStateByServiceType(value.Type);
              })



              //$scope.isAmbulanceCatSup = $rootScope.isAmbulanceCatSup;
              //$scope.isMedicalTherapistCatSup = $rootScope.isMedicalTherapistCatSup;
              //$scope.isStairsAssistanceCatSup = $rootScope.isStairsAssistanceCatSup;
              //$scope.selectedMenu = 'dashboard';
              //$scope.collapseVar = 0;
              //$scope.multiCollapseVar = 0;

              //$scope.check = function (x) {

              //    if (x == $scope.collapseVar)
              //        $scope.collapseVar = 0;
              //    else
              //        $scope.collapseVar = x;
              //};

              //$scope.multiCheck = function (y) {

              //    if (y == $scope.multiCollapseVar)
              //        $scope.multiCollapseVar = 0;
              //    else
              //        $scope.multiCollapseVar = y;
              //};
          }
      }
  }]).directive('setHeight', function ($window) {
      return {
          link: function (scope, element, attrs) {
              element.css('height', $window.innerHeight + 'px');
              //element.height($window.innerHeight/3);
          }
      }
  });
