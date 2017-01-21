'use strict';
angular.module('sbAdminApp').factory('ReservationService', ['$http', 'ngAuthSettings', 'WhiteLabelService', 'localStorageService', '$rootScope', '$q', function ($http, ngAuthSettings, WhiteLabelService, localStorageService, $rootScope, $q) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ReservationServiceFactory = {};
    var self=this;
    var _getReservations = function (status, type) {
        var deferred = $q.defer();
        var data={ status : status,
            whiteLabelId: WhiteLabelService.getWhiteLabelData().whiteLabelid,
            type: type
        }
        return $http.post(serviceBase + 'api/Reservation/GetReservationsListByWhiteLabelId', data).success(function (res) {

            _setReservationsListLocal(res);
        
            deferred.resolve(res);
        });
        return deferred.promise;
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
 
    var _setReservationsListLocal = function (reservationsList) {
        self.reservationsListLocal = reservationsList;
        $rootScope.$broadcast('updated-reservations-list');
    }
    var _getReservationsListLocal = function () {
        return self.reservationsListLocal;
    }
    
    ReservationServiceFactory.getReservations = _getReservations;
    ReservationServiceFactory.getReservationById = _getReservationById;
    ReservationServiceFactory.acceptReservation = _acceptReservation;
    ReservationServiceFactory.setSelectedReservationId = _setSelectedReservationId;
    ReservationServiceFactory.getSelectedReservationId = _getSelectedReservationId;
    ReservationServiceFactory.setSelectedReservation = _setSelectedReservation;
    ReservationServiceFactory.getSelectedReservation = _getSelectedReservation;
    ReservationServiceFactory.setReservationsListLocal = _setReservationsListLocal;
    ReservationServiceFactory.getReservationsListLocal = _getReservationsListLocal;
    return ReservationServiceFactory;

}]);