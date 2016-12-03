'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('HeaderCtrl',['$scope','authService',function ($scope, authService) {
      $scope.authentication = authService.authentication;
      console.log($scope.authentication)
      $scope.logOut = function () {
          authService.logOut();
      }
  }]);
