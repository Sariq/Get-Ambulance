﻿'use strict';
var headerCmp = ['authService','WhiteLabelService', function (authService, WhiteLabelService) {
    var ctrl = this;
    ctrl.logOut = function () {
        authService.logOut();
    }
    ctrl.updateWhiteLabelIsOnline = function (status) {
        WhiteLabelService.updateWhiteLabelIsOnline(status).then(function (res) {
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