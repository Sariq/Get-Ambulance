'use strict';
var distancePriceCmp = ['$scope', 'PricesService', '$state', function ($scope, PricesService, $state) {
    var ctrl = this;
    //PricesService.updatePricesByCategory("stairsBuilding");
    ctrl.myValue = 1;

}]
angular.module('sbAdminApp').component('distancePriceCmp', {
    bindings: {
   

   
    },
    templateUrl: 'components/services-settings/prices/distance/distance-cmp.html',
    controller: distancePriceCmp
});