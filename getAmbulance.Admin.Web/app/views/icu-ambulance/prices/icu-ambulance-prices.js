

angular.module('sbAdminApp').controller('IcuAmbulancePricesCtrl', function ($scope, ServicesSettingsService, WhiteLabelService) {
    $scope.weightPActions = {};
    $scope.stairsBuildingPActions = {};

    
    $scope.initData = function () {
        $scope.supportedService = WhiteLabelService.getSupportedServicesByType("4");

    }
    $scope.initData();
    $scope.save = function () {
  
    }
    
    $scope.$on('whiteLabel-data-updated', function (event, args) {
        $scope.initData();
    });
 
    $scope.edit = false;
  
})


