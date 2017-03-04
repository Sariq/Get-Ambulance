

angular.module('sbAdminApp').controller('SupportedAreaCtrl', function ($scope, ServicesSettingsService, WhiteLabelService, $rootScope,$stateParams) {
    $scope.weightPActions = {};
    
    $scope.serviceType = $stateParams.type;
    $scope.supportedAreas = WhiteLabelService.getSupportedAreasByServiceType($scope.serviceType);
    $scope.save = function () {
        $scope.weightPActions.saveItem();
        $scope.stairsBuildingPActions.saveItem();
    }
    
    $scope.$on('whiteLabel-data-updated', function (event, args) {
        var supportedAreasArgs = WhiteLabelService.getSupportedAreasByServiceType($scope.serviceType);
        $rootScope.$broadcast('supported-areas-updated', { supportedAreas: supportedAreasArgs });
    });
 
 
    $scope.edit = false;
    $scope.selectedArea = {radius: 5 };
    $scope.slider = {
        value: 5,
        options: {
            floor: 1,
            onChange: function (id) {
                $scope.valueChanged()
            },
            ceil: 10,
            step: 1,
            minLimit: 1,
            maxLimit: 10
        }
    };
})


