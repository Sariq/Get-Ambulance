'use strict';
var dateTimeCmp = function ($scope, $filter) {
    var ctrl = this;
    var timeOptions = {

        date: new Date(),
        mode: 'time',
        androidTheme: 2,
        is24Hour: true,
        titleText: 'בחר שעה'
    };

    var dateOptions = {

        date: new Date(),
        mode: 'date',
        androidTheme: 2,
        titleText: 'בחר תאריך'
    };
    ctrl.form = {};

    ctrl.time = $filter('date')(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), "HH:mm");
    ctrl.form.Time = ctrl.time;
    function onTimeSuccess(date) {
        ctrl.form.Time = $filter('date')(date, "HH:mm");  // for type="date" binding
        ctrl.time = ctrl.form.Time;
        $scope.$apply();
    }
    function onDateSuccess(date) {
        ctrl.form.Date = $filter('date')(date, "dd/MM/y");  // for type="date" binding
        ctrl.date=ctrl.form.Date;
        $scope.$apply();
    }

    function onError(error) { // Android only
        alert('Error: ' + error);
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
        timeOnly:'@'
    },
    templateUrl: 'components/date-time/date-time-cmp.html',
    controller: dateTimeCmp
});