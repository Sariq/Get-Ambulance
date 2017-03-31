
'use strict';
var dayNightPriceCmp = ['$scope', 'PricesService', '$state', 'WhiteLabelService', 'UserManagerService', function ($scope, PricesService, $state, WhiteLabelService, UserManagerService) {
    var ctrl = this;
    ctrl.isSupportRole = UserManagerService.isSupportRole();

    ctrl.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();

    ctrl.priceStep = 5;

    ctrl.edit = false;

    ctrl.dayNightActions.saveItem = function (index) {
        var category = ctrl.cat;

        PricesService.updatePricesByCategory(category, ctrl.price, ctrl.serviceType)
    }


  
}]
angular.module('sbAdminApp').component('dayNightPriceCmp', {
    bindings: {
        price: '=',
        edit: '=',
        dayNightActions: '=',
        serviceType: "@",
        cat:"@"


    },
    templateUrl: 'components/services-settings/prices/day-night/day-night-cmp.html',
    controller: dayNightPriceCmp
});