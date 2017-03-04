
'use strict';
var weightPriceCmp = ['$scope', 'PricesService', '$state', 'WhiteLabelService', function ($scope, PricesService, $state, WhiteLabelService) {
    var ctrl = this;
    //PricesService.updatePricesByCategory("stairsBuilding");
    ctrl.myValue = 1;
    ctrl.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();


    ctrl.edit = false;
    //ctrl.weightPrice = {"0":0, "90": 50, "120": 70 };
    ctrl.priceStep = 5;

    ctrl.weightPActions.saveItem = function (index) {
        var category = "weight";
       
        PricesService.updatePricesByCategory(category, ctrl.weightPrice, ctrl.serviceType)
    }

  
}]
angular.module('sbAdminApp').component('weightPriceCmp', {
    bindings: {
        edit: "=",
        weightPActions: "=",
        weightPrice: "=",
      serviceType:"@"

    },
    templateUrl: 'components/services-settings/prices/weight/weight-cmp.html',
    controller: weightPriceCmp
});