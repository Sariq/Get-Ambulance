'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('stats',function() {
    	return {
  		templateUrl:'scripts/directives/dashboard/stats/stats.html',
  		restrict:'E',
  		replace:true,
  		scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details':'@',
        'type':'@',
  
        'img': '@',
        'imgWidth': '@',
  		    'imgHeight':'@'
  		}, controller: function ($scope, CommonService, WhiteLabelService) {
  		    $scope.goto = CommonService.getStateByServiceType($scope.type);
  		    $scope.supportedService = WhiteLabelService.getSupportedServicesByType($scope.type);
  		    $scope.$on('whiteLabel-data-updated', function (event, args) {
  		        $scope.supportedService = WhiteLabelService.getSupportedServicesByType($scope.type);
  		        var flag = WhiteLabelService.isCanSetOnline($scope.supportedService);
  		        if (!flag) {
  		            $scope.supportedService.isOnline = false;
  		        }
  		    });
  		    $scope.updateWhiteLabelIsOnline = function (service) {
  		        var flag = WhiteLabelService.isCanSetOnline($scope.supportedService);
  		        if (flag) {
  		            WhiteLabelService.updateWhiteLabelIsOnline(service.Type, service.isOnline).then(function (res) {
  		                //if (!res.data) {
  		                //    $scope.supportedService.isOnline = false;

  		                //}
  		            });
  		        } else {
  		            $scope.supportedService.isOnline = false;
  		        }
  		      
  		    }

  		}
  		
  	}
  });
