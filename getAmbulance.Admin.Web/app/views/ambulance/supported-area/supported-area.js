

angular.module('sbAdminApp').controller('SupportedAreaCtrl', function ($scope, ServicesSettingsService, WhiteLabelService) {
    $scope.weightPActions = {};

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


