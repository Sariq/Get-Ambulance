

angular.module('sbAdminApp').controller('ServicesSettingsCtrl', function ($scope, ServicesSettingsService, WhiteLabelService, $filter, UserManagerService, $timeout) {
    $scope.areaData = {};
    $scope.isSupportRole = UserManagerService.isSupportRole();
    if (!$scope.isSupportRole) {
        $scope.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
        $scope.supportedServices = $scope.whiteLabel.supportedServices;

    } else {
        $scope.selectedWhiteLabelId = WhiteLabelService.getSelectedWhiteLabelId();
        WhiteLabelService.getWhiteLabelById($scope.selectedWhiteLabelId).then(function (res) {
            $scope.whiteLabel = res;
            $scope.supportedServices = $scope.whiteLabel.supportedServices;
            WhiteLabelService.setSelctedWhiteLabelData(res);
        })
    }

    $scope.whiteLabelUpdated = function () {
        if (!$scope.isSupportRole) {
            $scope.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
            $scope.supportedServices = $scope.whiteLabel.supportedServices;
            $scope.initOfferServices();
        } else {
            $scope.selectedWhiteLabelId = WhiteLabelService.getSelectedWhiteLabelId();
            WhiteLabelService.getWhiteLabelById($scope.selectedWhiteLabelId).then(function (res) {
                $scope.whiteLabel = res;
                $scope.supportedServices = $scope.whiteLabel.supportedServices;
                $scope.initOfferServices();
            })
        }
    }
    $scope.isWhiteLabelUpdated = false;
    $scope.$on('whiteLabel-data-updated', function (event, args) {
        $scope.isWhiteLabelUpdated=true;
        $scope.whiteLabelUpdated();
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
        ServicesSettingsService.AddSupportedServices(service).then(function (res) {
            $timeout(function () {
            if (!$scope.isWhiteLabelUpdated) {
                $scope.whiteLabelUpdated();
            }
            }, 3000);
        });
    }
  
    $scope.deleteService = function (service) {
        ServicesSettingsService.DeleteSupportedServices(service);
    }

    
})


