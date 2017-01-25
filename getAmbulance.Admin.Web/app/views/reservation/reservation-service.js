'use strict';
angular.module('sbAdminApp').factory('ReservationService', ['$http', 'ngAuthSettings', 'WhiteLabelService', 'localStorageService', '$rootScope', '$q', '$filter', function ($http, ngAuthSettings, WhiteLabelService, localStorageService, $rootScope, $q, $filter) {

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
    var _updateReservationStatus = function (reservation,status) {
        var data = {
            reservationId: reservation._id,
            Client_Id: reservation.Client_ID,
            Status: status,
            whiteLabelId: WhiteLabelService.getWhiteLabelData().whiteLabelid,
        }
        return $http.post(serviceBase + 'api/Reservation/UpdateReservationStatus', data);
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
    var _getStatusText = function (status) {
        switch(status){
            case '1':
                return $filter('translate')('Reservation_Pending');
                break
            case '2':
                return $filter('translate')('Reservation_Accepted');
                break
            case '3':
                return $filter('translate')('Reservation_Ignored'); 
                break
            
        }
    }
    var _getValueByKey = function (dataObject, key) {
        var item = $filter('filter')(dataObject, { _name: key }, true)[0]._value;
        return item;
    }
    
    var _groupByType = function (reservationsList) {
       return $filter('groupBy')(reservationsList, "Type");
    }
    var _filterByStatus = function (reservationsList,status) {
        return $filter('filterBy')(reservationsList, ["Status"], status );
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
    ReservationServiceFactory.getStatusText = _getStatusText;
    ReservationServiceFactory.getValueByKey = _getValueByKey;
    ReservationServiceFactory.updateReservationStatus = _updateReservationStatus;
    ReservationServiceFactory.groupByType = _groupByType;
    ReservationServiceFactory.filterByStatus = _filterByStatus;
    return ReservationServiceFactory;

}]);