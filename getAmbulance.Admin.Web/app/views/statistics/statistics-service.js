'use strict';
angular.module('sbAdminApp').factory('StatisticsService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', '$filter', 'ReservationService', 'WhiteLabelService', function ($http, ngAuthSettings, authService, localStorageService, $filter, ReservationService, WhiteLabelService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var StatisticsServiceFactory = {};


    var _getMonthsArray = function () {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        angular.forEach(monthNames, function (value, key) {
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

    var _convertMonthToNumber = function (reservationsList, year) {
        var activateDate = WhiteLabelService.isActivated();
        var monthsArray = _getMonthsArray();
        var tempNumberArry = [];
        angular.forEach(monthsArray, function (value, monthKey) {
            var counter = 0;
            angular.forEach(reservationsList, function (value, key) {
                var valueDate = (new Date(value._date));
                if (valueDate.getYear() == year && valueDate.getMonth() == monthKey) {
                    if (activateDate) {
                        if (valueDate >= activateDate) {
                            counter++;
                        }
                    } else {
                        counter++;
                    }
                }
            })
            tempNumberArry.push(counter)
        })
        return tempNumberArry;
    };

    var _getBillData = function (reservationsList, year) {
        var activateDate = WhiteLabelService.isActivated();
        var monthsArray = _getMonthsArray();
        var tempNumberArry = [];
        angular.forEach(monthsArray, function (value, monthKey) {
            var bill = 0;
            angular.forEach(reservationsList, function (value, key) {
                var valueDate = (new Date(value._date));
                if (value.Status == '2' && valueDate.getYear() == year && valueDate.getMonth() == monthKey) {
                    if (activateDate) {
                        if (valueDate >= activateDate) {
                            bill += (value.Price) * (15 / 100);
                        }
                    } else {
                        bill += (value.Price) * (15 / 100);
                    }
                }
            })
            tempNumberArry.push(bill)
        })
        return tempNumberArry;
    };



    var _convertDayToNumber = function (reservationsList, year, month) {
        var activateDate = WhiteLabelService.isActivated();
        var daysArray = _getDaysArray();
        var tempNumberArry = [];

        angular.forEach(daysArray, function (value, dayKey) {
            var counter = 0;
            angular.forEach(reservationsList, function (value, key) {
                var valueDate = (new Date(value._date));
                if (valueDate.getYear() == year && valueDate.getMonth() == month && valueDate.getDay() == dayKey) {
                    if (activateDate && valueDate >= activateDate) {
                        counter++;
                    }
                }
            })
            tempNumberArry.push(counter)
        })
        return tempNumberArry;
    };


    var _getReservationsByYearMonth = function (reservationsList, year, month) {
        var activateDate = WhiteLabelService.isActivated();
        var reservationsResult = [];
        angular.forEach(reservationsList, function (value, key) {
            var valueDate = (new Date(value._date));
            if (valueDate.getYear() == year && valueDate.getMonth() == month) {
                if (activateDate) {
                    if (valueDate >= activateDate) {
                        reservationsResult.push(value);
                    }
                } else {
                    reservationsResult.push(value);
                }

            }
        })
        return reservationsResult;
    }

    var _groupByStatus = function (reservationsList, year) {
        var temp_reservationsList = _getReservationsByYearMonth(reservationsList, year,new Date().getMonth());
        var tempStatusFilterData = $filter('groupBy')(temp_reservationsList, "Status");
        var statusChart = {
            labels: ["Reservation_Pending", "Reservation_Accepted", "Reservation_Ignored", "Reservation_Done", "Reservation_Canceled"],
            data: [0, 0, 0, 0, 0]
        };
        angular.forEach(tempStatusFilterData, function (value, key) {
            statusChart.labels[key - 1] = (ReservationService.getStatusText(key));
            statusChart.data[key - 1] = value.length;
        })
        return statusChart;
    }
    var _isZeroResults = function (array) {
        angular.forEach(array, function (value, key) {
            if (value > 0) {
                return false;
            }
        })
        return true;
    }

    
    StatisticsServiceFactory.getMonthsArray = _getMonthsArray;
    StatisticsServiceFactory.convertMonthToNumber = _convertMonthToNumber;
    StatisticsServiceFactory.groupByStatus = _groupByStatus;
    StatisticsServiceFactory.getBillData = _getBillData;
    StatisticsServiceFactory.isZeroResults = _isZeroResults;

    






    return StatisticsServiceFactory;

}]);