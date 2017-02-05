﻿'use strict';
var reservationsCmp = ['$scope', 'ReservationService', '$state', 'NgTableParams', '$filter', '$sce', 'ngDialog', function ($scope, ReservationService, $state, NgTableParams, $filter, $sce, ngDialog) {
    var ctrl = this;
    ctrl.noReservations = false;

    $scope.$on('update-reservations-list', function (event, args) {
        ctrl.getReservations();
    });
    $scope.dialogBodyText = 'Confirm_Reservation_Accept_Body_Text';
    ctrl.getReservations = function () {
        ReservationService.getReservations(ctrl.reservationStatus, ctrl.reservationType).then(function (res) {

            ctrl.reservationsList = res.data;
            ctrl.prepareTableCols();
        }, function (err) {
            console.log(err);
        });
    }
    ctrl.getReservations();

    ctrl.acceptReservation = function (reservation) {
        ReservationService.setSelectedReservationId(reservation._id);
        ReservationService.acceptReservation(reservation).then(function (res) {
            console.log(res.data);
            $state.go('dashboard.reservation-item');
        });
    }

    
    ctrl.updateReservationStatus = function (reservation, status) {
        ReservationService.setSelectedReservationId(reservation._id);
        ReservationService.updateReservationStatus(reservation, status).then(function (res) {
            switch (status) {
                case '3':
                    break
                default:
                    $state.go('dashboard.reservation-item');
                    break
            }
        });
    }
    
    ctrl.openConfirmReservationDialog = function (reservation) {
        $scope.selectedReservation = reservation;
        if ($scope.selectedReservation.Status == '1') {
            ngDialog.open({
                template: 'popUp/reservations-cmp/open-reservation.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                preCloseCallback: function (value) {
                    if (value) {
                        ctrl.updateReservationStatus(reservation, value);
                    }

                }
            });
        } else {
            ctrl.updateReservationStatus(reservation, $scope.selectedReservation.Status);

        }
       
    }
  
    ctrl.prepareTableCols = function () {
        if (ctrl.reservationsList.length>0) {
            ctrl.tableData = [];
        } else {
            ctrl.tableData = null;
        }
        

        angular.forEach(ctrl.reservationsList, function (value, key) {

            var startTime = new Date(value._date).getTime();
            var endTime = new Date();
            var dif = new Date(endTime).getTime() - new Date(value._date).getTime();
            var Seconds_from_T1_to_T2 = dif / 1000;
            var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
            Seconds_Between_Dates = 300 - Seconds_Between_Dates ;
            //console.log(value.Reservation_Number + '===' + Seconds_Between_Dates + '===' + endTime + '===' +  new Date(value._date))
            if (Seconds_Between_Dates > 300 || Seconds_Between_Dates <0) {
                Seconds_Between_Dates = 0.1;
            }
            
            ctrl.tableData.push({
                Client_ID:value.Client_ID,
                Status: value.Status,
                
                Reservation_Number: value.Reservation_Number,
                Price: value.Price,
                Date: ReservationService.getValueByKey(value.AdditionalProperties, "Date"),
                Time: ReservationService.getValueByKey(value.AdditionalProperties, "Time"),
                startTime: 1451628000000,
                endTime: Seconds_Between_Dates,
                Timer: $filter('date')(Math.round((new Date() - new Date(value._date))), 'mm:ss'),
                _id: value._id
            });
            if (!ctrl.reservationType) {
                ctrl.tableData[ctrl.tableData.length-1].Type = value.Type;
            }

            ctrl.filter = {};

            var tempStatusFilterData = $filter('groupBy')(ctrl.reservationsList, "Status");
            ctrl.filter.Status = [];
            angular.forEach(tempStatusFilterData, function (value, key) {
                ctrl.filter.Status.push({ id: key, title: ReservationService.getStatusText(value[0].Status) });

            })

            var tempTypeFilterData = $filter('groupBy')(ctrl.reservationsList, "Type");
            ctrl.filter.Type = [];
            angular.forEach(tempTypeFilterData, function (value, key) {
                if (value[0])
                ctrl.filter.Type.push({ id: key, title: ReservationService.getTypeText(value[0].Type) });

            })



        })

       
        if (ctrl.tableData) {

      
       
        ctrl.cols = [
         { field: "Reservation_Number", title: $filter('translate')('Number'), show: true, filter: { Reservation_Number: "text" } },
         { "class": "th-title", field: "Status", title: $filter('translate')('Status'), show: true, filter: { Status: "select" }, filterData: ctrl.filter.Status },


        
        ];
        if (!ctrl.reservationType) {
            ctrl.cols.push({ field: "Type", title: $filter('translate')('Type'), show: true, filter: { Type: "select" }, filterData: ctrl.filter.Type })
        }
        ctrl.cols.push(
                     { field: "Date", title: $filter('translate')('Date'), show: true, filter: { Date: "text" } },
         { field: "Time", title: $filter('translate')('Time'), show: true, filter: { Time: "text" } },
            { field: "Price", title: $filter('translate')('Price'), show: true, filter: { Price: "text" } },
       { field: "Timer", title: $filter('translate')('Timer'), show: true },
       { field: "Show_Reservation", title: '', show: true })
        }
        var data = [{ Show_Reservation: $sce.trustAsHtml('<button>hghg</button>'), Status: 50 }];
        if (ctrl.tableData) {
            ctrl.tableParams = new NgTableParams({ count: 5, sorting: { Timer: "asc" } }, { dataset: ctrl.tableData });
            ctrl.noReservations = false;
        } else {
            $ctrl.noReservations = true;
            ctrl.tableParams = null;

        }

      
    }
    ctrl.NextPage = function () {
        ctrl.tableParams.page(2);
    }
    //var today = new Date();
    //var Christmas = new Date("12-25-2012");
    //var diffMs = (Christmas - today); // milliseconds between now & Christmas
    //var diffDays = Math.floor(diffMs / 86400000); // days
    //var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    //var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    //alert(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes until Christmas 2009 =)");

}]
angular.module('sbAdminApp').component('reservationsCmp', {
    bindings: {
        reservationStatus: '=',
        reservationType: '=',
        tableName:'@'

    },
    templateUrl: 'components/reservation/reservations-cmp.html',
    controller: reservationsCmp
});