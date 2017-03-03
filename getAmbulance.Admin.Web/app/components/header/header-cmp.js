'use strict';
var headerCmp = ['authService','WhiteLabelService', function (authService, WhiteLabelService) {
    var ctrl = this;
    ctrl.logOut = function () {
        authService.logOut();
    }
    ctrl.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
    ctrl.supportedServices = ctrl.whiteLabel.supportedServices;

    ctrl.updateWhiteLabelIsOnline = function (service) {
        WhiteLabelService.updateWhiteLabelIsOnline(service.Type, service.isOnline).then(function (res) {
            console.log(res)
        });
    }
}]
angular.module('sbAdminApp').component('headerCmp', {
    bindings: {
        isAllReservations: '='
   
    },
    templateUrl: 'components/header/header-cmp.html',
    controller: headerCmp
});