/// <reference path="distance-cmp..js" />
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
    ctrl.priceStep = 10;
    ctrl.distanceStep = 5;
    ctrl.addNewRangePrice = function () {
        if (ctrl.rangePriceData[ctrl.rangePriceData.length - 1] != null) {
            ctrl.rangePriceData.push(
                {
                    "distance": ctrl.rangePriceData[ctrl.rangePriceData.length - 1].distance + ctrl.distanceStep,
                    "day": ctrl.rangePriceData[ctrl.rangePriceData.length - 1].day + ctrl.priceStep,
                    "night": ctrl.rangePriceData[ctrl.rangePriceData.length - 1].night + ctrl.priceStep
                })
        } else {
            ctrl.rangePriceData.push(
               {
                   "distance": 20,
                   "day": 100,
                   "night": 150
               })
        }
        ctrl.validateDistance(ctrl.rangePriceData.length - 1);
    }


    ctrl.deleteItem = function (index) {
        ctrl.rangePriceData.splice(index, 1);
        //PricesService.deletePricesByCategory(index);
        var category = "Private_Ambulance.distance";
        PricesService.updatePricesByCategory(category, ctrl.rangePriceData)
    }
    ctrl.saveItem = function (index) {
        var category = "Private_Ambulance.distance." + index;
        if (ctrl.rangePriceData[index].validations)
        delete ctrl.rangePriceData[index].validations;
        PricesService.updatePricesByCategory(category,ctrl.rangePriceData[index])
    }

    ctrl.validateDistance = function (index) {
   
        ctrl.rangePriceData[index].validations = {};
        if (ctrl.rangePriceData[index + 1]) {
            ctrl.rangePriceData[index].validations.isDistanceValid= ctrl.rangePriceData[index + 1].distance > ctrl.rangePriceData[index].distance;
        }
        if (ctrl.rangePriceData[index -1]) {
            ctrl.rangePriceData[index].validations.isDistanceValid = ctrl.rangePriceData[index - 1].distance < ctrl.rangePriceData[index].distance;
        }
        
    }
}]
angular.module('sbAdminApp').component('distancePriceCmp', {
    bindings: {



    },
    templateUrl: 'components/services-settings/prices/distance/distance-cmp.html',
    controller: distancePriceCmp
});