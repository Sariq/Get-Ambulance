'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function ($scope, authService) {
      $scope.authentication = authService.authentication;
      console.log($scope.authentication)
    
  });
