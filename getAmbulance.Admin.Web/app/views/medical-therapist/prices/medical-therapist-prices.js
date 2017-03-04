

angular.module('sbAdminApp').controller('MedicalTherapistPricesCtrl', function ($scope, ServicesSettingsService, WhiteLabelService) {
    $scope.dayNightActions = {};


    $scope.initData = function () {
        $scope.supportedService = WhiteLabelService.getSupportedServicesByType("2");
        $scope.price = angular.copy($scope.supportedService.prices.medicalTherapist);
    }
    $scope.initData();

   // $scope.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();
   // $scope.price = angular.copy($scope.whiteLabelData.prices.medicalTherapist);
    $scope.save = function () {
        $scope.dayNightActions.saveItem();
    }
    
    $scope.cancel = function () {
        $scope.price = angular.copy($scope.supportedService.prices.medicalTherapist);
    }
    
    $scope.$on('whiteLabel-data-updated', function (event, args) {
        $scope.initData();
    });
 
    $scope.edit = false;
  
})


