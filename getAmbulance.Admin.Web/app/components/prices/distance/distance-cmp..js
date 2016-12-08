'use strict';
var distancePriceCmp = ['$scope', 'PricesService', '$state', function ($scope, PricesService, $state) {
    var ctrl = this;


}]
angular.module('sbAdminApp').component('distancePriceCmp', {
    bindings: {
        reservationStatus: '=',

   
    },
    templateUrl: 'components/prices/distance/distance-cmp.html',
    controller: distancePriceCmp
});