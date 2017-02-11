'use strict';
var distancePriceCmp = ['$scope', 'PricesService', '$state', 'WhiteLabelService', function ($scope, PricesService, $state, WhiteLabelService) {
    var ctrl = this;
    //PricesService.updatePricesByCategory("stairsBuilding");
    ctrl.myValue = 1;
    WhiteLabelService.getWhiteLabelData().then(function (res) {
        ctrl.whiteLabelData = res;
        switch ("Private_Ambulance") {
            case "Private_Ambulance":
                ctrl.rangePriceData = ctrl.whiteLabelData.prices.Private_Ambulance.distance;
                break;
        }
    });


    ctrl.addNumber = function (key, number) {
        return (parseInt(key) + number).toString();
    }

    ctrl.addNewRangePrice = function () {
        if (ctrl.rangePriceData[ctrl.rangePriceData.length - 1] != null) {
            ctrl.rangePriceData.push(
                {
                    "distance": ctrl.rangePriceData[ctrl.rangePriceData.length - 1].distance + 1,
                    "day": ctrl.rangePriceData[ctrl.rangePriceData.length - 1].day + 1,
                    "night": ctrl.rangePriceData[ctrl.rangePriceData.length - 1].night + 1
                })
        } else {
            ctrl.rangePriceData.push(
               {
                   "distance": 20,
                   "day": 100,
                   "night": 150
               })
        }
    }


    ctrl.deleteItem = function (index) {
        ctrl.rangePriceData.splice(index, 1);
        //PricesService.deletePricesByCategory(index);
        var category = "Private_Ambulance.distance";
        PricesService.updatePricesByCategory(category, ctrl.rangePriceData)
    }
    ctrl.saveItem = function (index) {
        var category = "Private_Ambulance.distance." + index;
        PricesService.updatePricesByCategory(category,ctrl.rangePriceData[index])
      //  UpdateAmbulancePrices(ctrl.rangePriceData[index - 1]);
    }
}]
angular.module('sbAdminApp').component('distancePriceCmp', {
    bindings: {



    },
    templateUrl: 'components/services-settings/prices/distance/distance-cmp.html',
    controller: distancePriceCmp
});