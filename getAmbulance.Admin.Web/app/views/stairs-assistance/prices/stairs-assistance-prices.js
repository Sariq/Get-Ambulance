

angular.module('sbAdminApp').controller('StairsAssistancePricesCtrl', function ($scope, ServicesSettingsService, WhiteLabelService) {
    $scope.dayNightActions = {};

    $scope.initData = function () {
        $scope.supportedService = WhiteLabelService.getSupportedServicesByType("3");
        $scope.price = angular.copy($scope.supportedService.prices.stairsAssistance);
    }
    $scope.initData();

    //$scope.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();
    //$scope.price = angular.copy($scope.whiteLabelData.prices.stairsAssistance);
    $scope.save = function () {
        $scope.dayNightActions.saveItem();
    }

    $scope.cancel = function () {
        $scope.price = angular.copy($scope.supportedService.prices.stairsAssistance);
    }

    $scope.$on('whiteLabel-data-updated', function (event, args) {
        $scope.initData();
    });

    $scope.edit = false;
  
})


