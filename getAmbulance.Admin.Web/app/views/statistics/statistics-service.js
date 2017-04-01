'use strict';
angular.module('sbAdminApp').factory('StatisticsService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', '$filter', 'ReservationService', function ($http, ngAuthSettings, authService, localStorageService, $filter, ReservationService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var StatisticsServiceFactory = {};
   
    
    var _getMonthsArray = function () {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        angular.forEach(monthNames, function (value,key) {
            monthNames[key] = $filter('translate')(value);
        });
        return monthNames;
    };

    var _getDaysArray = function () {
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        angular.forEach(dayNames, function (value, key) {
            dayNames[key] = $filter('translate')(value);
        });
        return dayNames;
    };

    var _convertMonthToNumber = function (reservationsList,year) {
        var monthsArray = _getMonthsArray();
        var tempNumberArry = [];
        angular.forEach(monthsArray, function (value, monthKey) {
            var counter = 0;
            angular.forEach(reservationsList, function (value, key) {
                var valueDate = (new Date(value._date));
                if (valueDate.getYear() == year && valueDate.getMonth() == monthKey) {
                    counter++;
                }
            })
            tempNumberArry.push(counter)
        })
        return tempNumberArry;
    };
    var _getBillData = function (reservationsList, year) {
        var monthsArray = _getMonthsArray();
        var tempNumberArry = [];
        angular.forEach(monthsArray, function (value, monthKey) {
            var bill = 0;
            angular.forEach(reservationsList, function (value, key) {
                var valueDate = (new Date(value._date));
                if (value.Status=='2' && valueDate.getYear() == year && valueDate.getMonth() == monthKey) {
                    bill += (value.Price)*(15/100);
                }
            })
            tempNumberArry.push(bill)
        })
        return tempNumberArry;
    };

    

    var _convertDayToNumber = function (reservationsList, year, month) {
        var daysArray = _getDaysArray();
        var tempNumberArry = [];
        
        angular.forEach(daysArray, function (value, dayKey) {
            var counter = 0;
            angular.forEach(reservationsList, function (value, key) {
                var valueDate = (new Date(value._date));
                if (valueDate.getYear() == year && valueDate.getMonth() == month && valueDate.getDay() == dayKey) {
                    counter++;
                }
            })
            tempNumberArry.push(counter)
        })
        return tempNumberArry;
    };
    
    var _groupByStatus = function (reservationsList) {
        var tempStatusFilterData = $filter('groupBy')(reservationsList, "Status");
        var statusChart = {
            labels:["Reservation_Pending","Reservation_Accepted","Reservation_Ignored","Reservation_Done","Reservation_Canceled"],
            data:[0,0,0,0,0]};
        angular.forEach(tempStatusFilterData, function (value,key) {
            statusChart.labels[key-1]=(ReservationService.getStatusText(key));
            statusChart.data[key-1]=value.length;
        })
        return statusChart;
    }
    StatisticsServiceFactory.getMonthsArray = _getMonthsArray;
    StatisticsServiceFactory.convertMonthToNumber = _convertMonthToNumber;
    StatisticsServiceFactory.groupByStatus = _groupByStatus;
    StatisticsServiceFactory.getBillData = _getBillData;

    

    

 
    return StatisticsServiceFactory;

}]);