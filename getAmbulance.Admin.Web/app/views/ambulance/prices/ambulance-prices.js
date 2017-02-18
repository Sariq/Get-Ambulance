

angular.module('sbAdminApp').controller('AmbulancePricesCtrl', function ($scope, ServicesSettingsService, WhiteLabelService) {
    $scope.weightPActions = {};
    $scope.stairsBuildingPActions = {};
    $scope.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();
    $scope.save = function () {
        $scope.weightPActions.saveItem();
        $scope.stairsBuildingPActions.saveItem();
    }
    
    $scope.$on('whiteLabel-data-updated', function (event, args) {
        $scope.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();
    });
 
    $scope.edit = false;
  
})


