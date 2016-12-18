'use strict';
angular.module('starter.controllers').factory('ReservationService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', function ($http, ngAuthSettings, authService, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ReservationServiceFactory = {};
    
    var _getReservations = function (status,type) {
        var data={ status : status,
            ClientId: authService.getUserProfile()._id,
            type: type
        }
        return $http.post(serviceBase + 'api/Reservation/GetReservationsListByClientId', data);
    };
    var _getReservationById= function (reservationId) {
        var data = {
            reservationId: reservationId
        }
        return $http.post(serviceBase + 'api/Reservation/GetReservationById', data);
    };
    var _acceptReservation = function (reservation) {
        var data = {
            reservationId: reservation._id,
            Client_Id: reservation.Client_ID
        }
        return $http.post(serviceBase + 'api/Reservation/AcceptReservation', data);
    }

    var _setSelectedReservationId = function (id) {
        localStorageService.set('selectedReservationId', id);
    }
    var _getSelectedReservationId = function () {
        return localStorageService.get('selectedReservationId');
    }
    var _setSelectedReservation = function (reservationData) {
        localStorageService.set('selectedReservation', reservationData);
    }
    var _getSelectedReservation = function () {
        return localStorageService.get('selectedReservation');
    }
    ReservationServiceFactory.getReservations = _getReservations;
    ReservationServiceFactory.getReservationById = _getReservationById;
    ReservationServiceFactory.acceptReservation = _acceptReservation;
    ReservationServiceFactory.setSelectedReservationId = _setSelectedReservationId;
    ReservationServiceFactory.getSelectedReservationId = _getSelectedReservationId;
    ReservationServiceFactory.setSelectedReservation = _setSelectedReservation;
    ReservationServiceFactory.getSelectedReservation = _getSelectedReservation;
    return ReservationServiceFactory;

}]);