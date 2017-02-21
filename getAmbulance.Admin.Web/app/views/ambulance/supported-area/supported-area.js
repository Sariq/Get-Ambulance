

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


