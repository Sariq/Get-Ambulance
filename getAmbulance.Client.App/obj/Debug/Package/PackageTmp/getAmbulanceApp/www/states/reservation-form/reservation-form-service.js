

angular.module('starter.controllers').service('ReservationService', function ($http, ngAuthSettings) {
    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    self.getDistance = function (address, callback) {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
              origins: [address.collect],
              destinations: [address.drop],
              travelMode: 'DRIVING'
             
          }, callback);

        
    }
   
    self.getAmbulanceOffersList = function (form) {
        return $http.post(serviceBase + 'api/Reservation/GetAmbulanceOffersList', form);
    }
    self.setWhiteLabelOffer = function (offer) {
        self.whiteLabelOffer = offer;
    }
    self.getWhiteLabelOffer = function () {
       return self.whiteLabelOffer;
    }

    self.setReservationData = function (reservationData) {
        self.reservationData = reservationData;
    }
    self.getReservationData = function () {
        return self.reservationData;
    }

    self.sendReservationData = function () {
        var reservation = {};
        reservation.Reservation_Form = self.getReservationData();
        reservation.WhiteLabel_ID = self.getWhiteLabelOffer().whiteLabelid;
        reservation.Status = 1;

        return $http.post(serviceBase + 'api/Reservation/AddReservation', reservation);
    }
})


