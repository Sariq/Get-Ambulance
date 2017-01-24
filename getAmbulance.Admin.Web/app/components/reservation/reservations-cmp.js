'use strict';
var reservationsCmp = ['$scope', 'ReservationService', 'Reservations', '$state', 'NgTableParams', '$filter', '$sce', 'ngDialog', function ($scope, ReservationService, Reservations, $state, NgTableParams, $filter, $sce, ngDialog) {
    var ctrl = this;
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
    ctrl.openConfirmReservationDialog = function (reservation) {
        ngDialog.open({
            template: 'popUp/reservations-cmp/open-reservation.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            preCloseCallback: function (value) {
                switch (value) {
                    case 1:
                        ctrl.acceptReservation(reservation);
                        break
                    case 2:

                        break
                }
            }
        });
    }
  
    ctrl.prepareTableCols = function () {
        ctrl.tableData = [];
        angular.forEach(ctrl.reservationsList, function (value, key) {

            var startTime = new Date(value._date).getTime();
            var endTime = new Date(value._date);
            endTime.setMinutes(endTime.getMinutes() + 5);
            ctrl.tableData.push({
                Client_ID:value.Client_ID,
                Status: value.Status,
                Type: value.Type,
                Reservation_Number: value.Reservation_Number,
                Price: value.Price,
                Date: ReservationService.getValueByKey(value.AdditionalProperties, "Date"),
                Time: ReservationService.getValueByKey(value.AdditionalProperties, "Time"),
                startTime: startTime,
                endTime: endTime,
                Timer: $filter('date')(Math.round((new Date() - new Date(value._date))), 'mm:ss'),
                _id: value._id
            });
            ctrl.filter = {};

            var tempStatusFilterData = $filter('groupBy')(ctrl.reservationsList, "Status");
            ctrl.filter.Status = [];
            angular.forEach(tempStatusFilterData, function (value, key) {
                ctrl.filter.Status.push({ id: key, title: ReservationService.getStatusText(value[0].Status) });

            })



        })


        ctrl.cols = [
         { field: "Reservation_Number", title: $filter('translate')('Number'), show: true, filter: { Reservation_Number: "text" } },
         { "class": "th-title", field: "Status", title: $filter('translate')('Status'), show: true, filter: { Status: "select" }, filterData: ctrl.filter.Status },
         { field: "Type", title: $filter('translate')('Type'), show: true, filter: { Type: "text" } },
         { field: "Date", title: $filter('translate')('Date'), show: true, filter: { Date: "text" } },
         { field: "Time", title: $filter('translate')('Time'), show: true, filter: { Time: "text" } },

         { field: "Price", title: $filter('translate')('Price'), show: true, filter: { Price: "text" } },
         { field: "Timer", title: $filter('translate')('Timer'), show: true },
         { field: "Show_Reservation", title: '', show: true }
        ];
        var data = [{ Show_Reservation: $sce.trustAsHtml('<button>hghg</button>'), Status: 50 }];
        ctrl.tableParams = new NgTableParams({ count: 5, sorting: { Timer: "asc" } }, { dataset: ctrl.tableData });
        console.log(ctrl.tableParams.page())
        console.log(ctrl.tableParams.count())
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

    },
    templateUrl: 'components/reservation/reservations-cmp.html',
    controller: reservationsCmp
});