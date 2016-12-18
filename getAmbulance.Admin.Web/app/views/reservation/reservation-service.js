'use strict';
angular.module('sbAdminApp').factory('ReservationService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', function ($http, ngAuthSettings, authService, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ReservationServiceFactory = {};
    
    var _getReservations = function (status,type) {
        var data={ status : status,
            whiteLabelId: authService.authentication.WhiteLabelData.whiteLabelid,
            type: type
        }
        return $http.post(serviceBase + 'api/Reservation/GetReservationsListByWhiteLabelId', data);
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