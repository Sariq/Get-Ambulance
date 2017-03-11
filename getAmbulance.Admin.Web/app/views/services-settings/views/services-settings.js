

angular.module('sbAdminApp').controller('ServicesSettingsCtrl', function ($scope, ServicesSettingsService, WhiteLabelService, $filter) {
    $scope.areaData = {};
    $scope.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
    $scope.supportedServices = $scope.whiteLabel.supportedServices;


    $scope.$on('whiteLabel-data-updated', function (event, args) {
        $scope.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
        $scope.supportedServices = $scope.whiteLabel.supportedServices;
        $scope.initOfferServices();
    });

    $scope.initOfferServices = function () {
        $scope.offerServices = [];
        for (var i = 1; i < 5; i++) {
            var res =null;
            if ($scope.supportedServices)
            var res = $filter('filter')($scope.supportedServices, { Type: i.toString() }, true)[0];
            if (!res) {
                var service = WhiteLabelService.initSupportedServiceByType(i.toString());
                $scope.offerServices.push(service);
            }
        }
    }
    $scope.initOfferServices();
    
    $scope.UpdateSupportedAreas = function () {
        ServicesSettingsService.UpdateSupportedAreas($scope.areaData);
    }
 
    $scope.AddSupportedServices = function (service) {
        ServicesSettingsService.AddSupportedServices(service);
    }
  
    $scope.deleteService = function (service) {
        ServicesSettingsService.DeleteSupportedServices(service);
    }

    
})


