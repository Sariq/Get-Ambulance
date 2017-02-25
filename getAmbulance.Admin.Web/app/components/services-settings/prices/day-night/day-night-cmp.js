
'use strict';
var dayNightPriceCmp = ['$scope', 'PricesService', '$state', 'WhiteLabelService', function ($scope, PricesService, $state, WhiteLabelService) {
    var ctrl = this;

    ctrl.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();

    ctrl.priceStep = 5;

    ctrl.edit = false;

    ctrl.dayNightActions.saveItem = function (index) {
        var category = "medicalTherapist"

        PricesService.updatePricesByCategory(category, ctrl.price)
    }


  
}]
angular.module('sbAdminApp').component('dayNightPriceCmp', {
    bindings: {
        price: '=',
        edit: '=',
        dayNightActions:'='


    },
    templateUrl: 'components/services-settings/prices/day-night/day-night-cmp.html',
    controller: dayNightPriceCmp
});