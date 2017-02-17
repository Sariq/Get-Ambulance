
'use strict';
var weightPriceCmp = ['$scope', 'PricesService', '$state', 'WhiteLabelService', function ($scope, PricesService, $state, WhiteLabelService) {
    var ctrl = this;
    //PricesService.updatePricesByCategory("stairsBuilding");
    ctrl.myValue = 1;
    ctrl.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();


    ctrl.edit = true;
    ctrl.weightPrice = {"0":0, "90": 50, "120": 70 };
    ctrl.priceStep = 5;
 
    ctrl.saveItem = function (index) {
        var category = "weight." + index;
       
        PricesService.updatePricesByCategory(category,ctrl.rangePriceData[index])
    }

    ctrl.validateDistance = function (index) {
   
        ctrl.rangePriceData[index].validations = {};
        if (ctrl.rangePriceData[index + 1]) {
            ctrl.rangePriceData[index].validations.isDistanceValid= ctrl.rangePriceData[index + 1].weight > ctrl.rangePriceData[index].weight;
        }
        if (ctrl.rangePriceData[index -1]) {
            ctrl.rangePriceData[index].validations.isDistanceValid = ctrl.rangePriceData[index - 1].weight < ctrl.rangePriceData[index].weight;
        }
        
    }
}]
angular.module('sbAdminApp').component('weightPriceCmp', {
    bindings: {



    },
    templateUrl: 'components/services-settings/prices/weight/weight-cmp.html',
    controller: weightPriceCmp
});