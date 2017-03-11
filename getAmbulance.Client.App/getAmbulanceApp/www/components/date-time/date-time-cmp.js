'use strict';
var dateTimeCmp = function ($scope, $filter) {
    var ctrl = this;

    if (!ctrl.dateTitleText) {
        ctrl.dateTitleText = 'Date';
    }
    var timeOptions = {

        date: new Date(),
        mode: 'time',
        androidTheme: 2,
        is24Hour: true,
        titleText: 'בחר שעה'
    };
    if (!ctrl.dateTitleText) {
        ctrl.dateTitleText='Choose_Title'
    }





    if (!ctrl.minDate) {
        ctrl.minDate = new Date().getTime();
    } else {
        ctrl.minDate = (new Date(JSON.parse(ctrl.minDate))).getTime();
    }

    if (!ctrl.maxDate) {
        ctrl.maxDate =null;
    } else {
        ctrl.maxDate = (new Date(JSON.parse(ctrl.maxDate))).getTime();
    }

    var dateOptions = {
        date: new Date(),
        mode: 'date',
        androidTheme: 2,
        titleText: 'בחר תאריך',
        minDate: ctrl.minDate,
        maxDate: ctrl.maxDate,
        allowOldDates:false
    };
    ctrl.form = {};

//    ctrl.time = $filter('date')(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "HH:mm");
 //   ctrl.form.Time = ctrl.time;
    function onTimeSuccess(date) {
        ctrl.form.Time = $filter('date')(date, "HH:mm");  // for type="date" binding
        ctrl.time = ctrl.form.Time;
        $scope.$apply();
    }
 //   ctrl.form.Date = $filter('date')(new Date(), "dd/MM/y");
    function onDateSuccess(date) {
       
        if (ctrl.notFormatedDate) {
            ctrl.form.Date = date;  // for type="date" binding
        } else {
            ctrl.form.Date = $filter('date')(date, "dd/MM/y");  // for type="date" binding

        }
        ctrl.date = $filter('date')(date, "dd/MM/y");
       // ctrl.date = $filter('date')(new Date(), "dd/MM/y");
        $scope.$apply();
    }

    function onError(error) { // Android only
      //  alert('Error: ' + error);
    }
    ctrl.openTimePicker = function () {
        datePicker.show(timeOptions, onTimeSuccess, onError);
    }
    ctrl.openDatePicker = function () {
        datePicker.show(dateOptions, onDateSuccess, onError);
    }
  
}
angular.module('starter.controllers').component('dateTimeCmp', {
    bindings: {
        date: '=',
        time: '=',
        dateOnly: '@',
        timeOnly: '@',
        notFormatedDate: '@',
        dateTitleText: '@',
        minDate: '@',
        maxDate:'@'
    },
    templateUrl: 'components/date-time/date-time-cmp.html',
    controller: dateTimeCmp
});