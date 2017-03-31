/// <reference path="reservations-cmp.js" />
'use strict';
var whitelabelListCmp = ['$scope', 'ReservationService', '$state', 'NgTableParams', '$filter', '$sce', 'ngDialog', '$timeout', 'eUserRole', 'UserManagerService', 'WhiteLabelService', function ($scope, ReservationService, $state, NgTableParams, $filter, $sce, ngDialog, $timeout, eUserRole, UserManagerService, WhiteLabelService) {
    var ctrl = this;
    ctrl.noReservations = false;
    ctrl.userData = UserManagerService.getUserData();
    ctrl.isSupportRole = UserManagerService.isSupportRole();
    ctrl.whiteLabelsList = WhiteLabelService.getWhiteLabelsListLocal();
    ctrl.prepareTableCols = function () {
        if (ctrl.whiteLabelsList.length > 0) {
            ctrl.tableData = [];
        } else {
            ctrl.tableData = null;
        }


        angular.forEach(ctrl.whiteLabelsList, function (value, key) {
            var whiteLabelData = {
                Name: value.name,
                Phone_Number: value.phoneNumber,
                Id: value.whiteLabel_Id
            };
           
            ctrl.tableData.push(whiteLabelData);
            ctrl.filter = {};
        })

        if (ctrl.tableData) {

            ctrl.cols = [
             { field: "Name", title: $filter('translate')('Name'), show: true, filter: { Name: "text" } },
             { field: "Phone_Number", title: $filter('translate')('Phone_Number'), show: true, filter: { Phone_Number: "text" } },
             { field: "Show_Reservation", title: '', show: true }
            ];

        }
        if (ctrl.tableData) {
            ctrl.tableParams = new NgTableParams({ count: 50 }, { dataset: ctrl.tableData });
            ctrl.noReservations = false;
        } else {
            ctrl.noReservations = true;
            ctrl.tableParams = null;
        }


    }
    ctrl.NextPage = function () {
        ctrl.tableParams.page(2);
    }
    ctrl.goToWLItem = function (WL) {

        WhiteLabelService.setSelectedWhiteLabelId(WL.Id);
        $state.go('dashboard.whitelabel-item');
    }
    
    ctrl.prepareTableCols();

}]
angular.module('sbAdminApp').component('whitelabelListCmp', {
    bindings: {
        tableName: '@'
    },
    templateUrl: 'components/whitelabel-list/whitelabel-list-cmp.html',
    controller: whitelabelListCmp
});