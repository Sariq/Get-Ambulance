

angular.module('sbAdminApp').controller('AmbulancePricesCtrl', function ($scope, ServicesSettingsService, WhiteLabelService) {
    $scope.weightPActions = {};
    $scope.stairsBuildingPActions = {};

    
    $scope.initData = function () {
        $scope.supportedService = WhiteLabelService.getSupportedServicesByType("1");
        $scope.weightPrice = $scope.supportedService.prices.weight;
        $scope.stairsBuildingPrice = $scope.supportedService.prices.stairsBuilding;
    }
    $scope.initData();
    $scope.save = function () {
        $scope.weightPActions.saveItem();
        $scope.stairsBuildingPActions.saveItem();
    }
    
    $scope.$on('whiteLabel-data-updated', function (event, args) {
        $scope.initData();
    });
 
    $scope.edit = false;
  
})


