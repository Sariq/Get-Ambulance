
'use strict';
var distancePriceCmp = ['$scope', 'PricesService', '$state', 'WhiteLabelService', 'UserManagerService', function ($scope, PricesService, $state, WhiteLabelService, UserManagerService) {
    var ctrl = this;
    ctrl.isSupportRole = UserManagerService.isSupportRole();

    //PricesService.updatePricesByCategory("stairsBuilding");
    ctrl.myValue = 1;
    ctrl.initData = function () {
        ctrl.supportedService = WhiteLabelService.getSupportedServicesByType(ctrl.serviceType);
        ctrl.rangePriceData = ctrl.supportedService.prices.distance?ctrl.supportedService.prices.distance : [];
     
    }
    ctrl.initData();
    //ctrl.whiteLabelData = WhiteLabelService.getWhiteLabelDataLocal();
    //switch ("Private_Ambulance") {
    //    case "Private_Ambulance":
    //        ctrl.rangePriceData = ctrl.whiteLabelData.prices.Private_Ambulance.distance;
    //        break;
    //}

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
  
        ctrl.rangePriceData[ctrl.rangePriceData.length - 1].edit = true;
        ctrl.validateDistance(ctrl.rangePriceData.length - 1);
    }


    ctrl.deleteItem = function (index) {
        ctrl.rangePriceData.splice(index, 1);
        //PricesService.deletePricesByCategory(index);
        var category = "distance";
        PricesService.updatePricesByCategory(category, ctrl.rangePriceData, ctrl.serviceType)
    }
    ctrl.saveItem = function (index) {
        if (ctrl.rangePriceData[index].validations)
            delete ctrl.rangePriceData[index].validations;
        if (ctrl.rangePriceData[index].edit)
            delete ctrl.rangePriceData[index].edit;

        if (ctrl.rangePriceData.length == 1) {
            var category = "distance";
            var data = ctrl.rangePriceData;
        } else {
            var category = "distance." + index;
            var data = ctrl.rangePriceData[index];
        }
        PricesService.updatePricesByCategory(category, data, ctrl.serviceType)
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
        serviceType:'@'


    },
    templateUrl: 'components/services-settings/prices/distance/distance-cmp.html',
    controller: distancePriceCmp
});