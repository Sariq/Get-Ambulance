

angular.module('sbAdminApp').controller('ServicesSettingsCtrl', function ($scope, ServicesSettingsService) {
    $scope.areaData = {};
    $scope.UpdateSupportedAreas = function () {
        ServicesSettingsService.UpdateSupportedAreas($scope.areaData);
    }
 
  
})


