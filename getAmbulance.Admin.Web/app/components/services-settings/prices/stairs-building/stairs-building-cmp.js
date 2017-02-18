
'use strict';
var stairsBuildingPriceCmp = ['$scope', 'PricesService', '$state', 'WhiteLabelService', function ($scope, PricesService, $state, WhiteLabelService) {
    var ctrl = this;
    //PricesService.updatePricesByCategory("stairsBuilding");
    ctrl.myValue = 1;
    ctrl.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();


    ctrl.edit = false;
    //ctrl.stairsBuildingPrice = 30;
    ctrl.priceStep = 5;
 
    ctrl.stairsBuildingPActions.saveItem = function (index) {
        var category = "stairsBuilding"
       
        PricesService.updatePricesByCategory(category, ctrl.stairsBuildingPrice)
    }


}]
angular.module('sbAdminApp').component('stairsBuildingPriceCmp', {
    bindings: {
        edit: "=",
        stairsBuildingPActions: "=",
        stairsBuildingPrice: "="


    },
    templateUrl: 'components/services-settings/prices/stairs-building/stairs-building-cmp.html',
    controller: stairsBuildingPriceCmp
});