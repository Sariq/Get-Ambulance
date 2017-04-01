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
          controller: function ($scope, WhiteLabelService, CommonService, UserManagerService) {
              $scope.isSupportRole = UserManagerService.isSupportRole();
              $scope.initData = function () {
                  $scope.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
                  $scope.supportedServices = $scope.whiteLabel.supportedServices;
                  angular.forEach($scope.supportedServices, function (value, key) {
                      value.goto = CommonService.getStateByServiceType(value.Type);
                  })
              }
              $scope.initData();

              $scope.$on('whiteLabel-data-updated', function (event, args) {
                  $scope.initData();
              });

              $scope.onChangeState = function () {
                  WhiteLabelService.setSelctedWhiteLabelData(undefined);
              }
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
