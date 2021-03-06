﻿

angular.module('starter.controllers').service('ReservationService', function ($http, ngAuthSettings, localStorageService, eReservationAdditionalProperties, $timeout) {
    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    self.formData = {};
    


    self.mergeToFormData = function (formData) {
        if (self.formData, length == 0) {
            if (localStorageService.get('reservationFormData'))
            self.formData=localStorageService.get('reservationFormData');
        }
        self.formData = angular.extend(self.formData, formData);
        localStorageService.set('reservationFormData', self.formData);
        
        
    }

    self.getDistance = function (form, callback) {
     
           
  
        try {

            var service = new google.maps.DistanceMatrixService();
        } catch (er) {
            alert(er)

        }
      
      
        service.getDistanceMatrix(
          {
              origins: [form.From_Address],
              destinations: [form.To_Address],
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
        var Reservation_Form = localStorageService.get('reservationFormData');
        reservation.WhiteLabel_ID = self.getWhiteLabelOffer().whiteLabelid;
        reservation.Type = localStorageService.get('reservationType');
        reservation.Status = "1";
        reservation.Full_Name =Reservation_Form.Full_Name;
        reservation.Phone_Number =Reservation_Form.Phone_Number;
        reservation.Age = Reservation_Form.Age;
        reservation.Id_Number = Reservation_Form.Id_Number;
        

        delete Reservation_Form.Full_Name;
        delete Reservation_Form.Phone_Number;
        delete Reservation_Form.Age;
        delete Reservation_Form.Id_Number;
        reservation.AdditionalProperties = [];

        angular.forEach(Reservation_Form, function (value, key) {
            reservation.AdditionalProperties.push({ Key: key, Value: value });
        })
     
        
  
        return $http.post(serviceBase + 'api/Reservation/AddReservation', reservation);
    }
})


