'use strict';
var infoHeaderCmp = function ($scope, $rootScope, $timeout) {
    var ctrl = this;
    $scope.$on('device:ready', function() {
        $timeout(function () {
            ctrl.isCustomEn = $rootScope.isCustomEn;
                });
        
        console.log(ctrl.isCustomEn)
    });
    ctrl.isCustomEn = $rootScope.isCustomEn;

}
angular.module('starter.controllers').component('infoHeaderCmp', {
    bindings: {
        infoText: '='
    },
    templateUrl: 'components/info-header/info-header-cmp.html',
    controller: infoHeaderCmp
});