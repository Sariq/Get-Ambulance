

angular.module('sbAdminApp').controller('MedicalTherapistPricesCtrl', function ($scope, ServicesSettingsService, WhiteLabelService) {
    $scope.dayNightActions = {};

    $scope.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();
    $scope.price = angular.copy($scope.whiteLabelData.prices.medicalTherapist);
    $scope.save = function () {
        $scope.dayNightActions.saveItem();
    }
    
    $scope.cancel = function () {
        $scope.price = angular.copy($scope.whiteLabelData.prices.medicalTherapist);
    }
    
    $scope.$on('whiteLabel-data-updated', function (event, args) {
        $scope.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();
    });
 
    $scope.edit = false;
  
})


