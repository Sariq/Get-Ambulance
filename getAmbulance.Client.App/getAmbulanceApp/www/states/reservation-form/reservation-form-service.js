

angular.module('starter.controllers').service('ReservationService', function ($filter,$http, UserProfileService, ngAuthSettings, localStorageService, eReservationAdditionalProperties, $timeout) {
    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    self.formData = {};
    


    self.mergeToFormData = function (formData) {
        
        if (localStorageService.get('reservationFormData')) {
            self.formData = localStorageService.get('reservationFormData');
        } else {
            self.formData = {};
        }
            
 
        self.formData = angular.extend(self.formData, formData);
        localStorageService.set('reservationFormData', self.formData);
    }
    self.setReservationFormData = function (formData) {
        return localStorageService.set('reservationFormData', formData);
    }
    self.getReservationFormData = function () {
        return localStorageService.get('reservationFormData');
    }
    self.deleteReservationFormDate = function () {
        localStorageService.remove('reservationFormData');
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
   
    self.getAmbulanceOffersList = function (form, addressList) {
        var data = {
            form: form,
            addressList: addressList
        }
        return $http.post(serviceBase + 'api/Reservation/GetAmbulanceOffersList', data);
    }

    self.getMedicalTherapistOffersList = function (form, addressList) {
        var data = {
            form: form,
            addressList: addressList
        }
        return $http.post(serviceBase + 'api/Reservation/GetMedicalTherapistOffersList', data);
    }

    self.getStairsAssistanceOffersList = function (form,addressList) {
        var data = {
            form: form,
            addressList: addressList
        }
        return $http.post(serviceBase + 'api/Reservation/GetStairsAssistanceOffersList', data);
    }
    
    self.getReservations = function (status, type) {
        var data = {
            status: status,
            ClientId: UserProfileService.getUserProfileLocal()._id,
            type: type
        }
        return $http.post(serviceBase + 'api/Reservation/GetReservationsListByClientId', data);
    };
    self.getReservationById = function (ReservationId) {
        var data = {
            reservationId: ReservationId,
        }
        return $http.post(serviceBase + 'api/Reservation/GetReservationById', data);
    };
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
    self.removeFromLocalStorage = function () {

        switch (localStorageService.get('reservationType')) {
            case '1':
                localStorageService.remove('ambulancePriceOffersList');
                break;
            case '2':
                localStorageService.remove('medicalTherapistOffersList');
                break;
            case '3':
                localStorageService.remove('stairsAssistanceOffersList');
                break;
        }
        localStorageService.remove('reservationFormData');
        localStorageService.remove('selectedReservation');
        localStorageService.remove('reservationType');
    }

  

    self.sendReservationData = function () {
        var reservation = {};
        var Reservation_Form = localStorageService.get('reservationFormData');
        reservation.WhiteLabel_ID = self.getWhiteLabelOffer().whiteLabelid;
        reservation.Price = self.getWhiteLabelOffer().price;
        reservation.Client_ID = UserProfileService.getUserProfileLocal()._id;
        reservation.Type = localStorageService.get('reservationType');
        reservation.Status = "1";
        reservation.Full_Name =Reservation_Form.Full_Name;
        reservation.Phone_Number =Reservation_Form.Phone_Number;
        reservation.Age = Reservation_Form.Age.toString();
        reservation.Id_Number = Reservation_Form.Id_Number?Reservation_Form.Id_Number.toString():null;
        reservation.IsHideClient = Reservation_Form.IsHideClient ? Reservation_Form.IsHideClient : false;
       // reservation._id = Reservation_Form._id;
        if (Reservation_Form.Reservation_Number) {
            reservation.Reservation_Number = Reservation_Form.Reservation_Number;
        }
        if (Reservation_Form._id) {
          //  reservation.Reservation_Number = Reservation_Form._id;
        }
        delete Reservation_Form.Full_Name;
        delete Reservation_Form.Phone_Number;
        delete Reservation_Form.Age;
        delete Reservation_Form.Id_Number;
        delete Reservation_Form.Client_ID;
        delete Reservation_Form.Reservation_Number;
        delete Reservation_Form.Type;
        delete Reservation_Form.AdditionalProperties;
        reservation.AdditionalProperties = [];

        angular.forEach(Reservation_Form, function (value, key) {
            reservation.AdditionalProperties.push({ Key: key, Value: value });
        })
        self.removeFromLocalStorage();
  
        return $http.post(serviceBase + 'api/Reservation/AddReservation', reservation);
    }
    self.convertFormToOfferRequest = function () {
        var reservation = {};
        var Reservation_Form = self.getReservationFormData();

   
        reservation.Client_ID = UserProfileService.getUserProfileLocal()._id;
        reservation.Type = localStorageService.get('reservationType');
        reservation.Status = "1";
        reservation.Full_Name = Reservation_Form.Full_Name;
        reservation.Phone_Number = Reservation_Form.Phone_Number;
        reservation.Age = Reservation_Form.Age;
        reservation.Id_Number = Reservation_Form.Id_Number ? Reservation_Form.Id_Number.toString() : null;
        reservation.Reservation_Number = null;
        reservation._id = Reservation_Form._id;



 

        angular.forEach(Reservation_Form.AdditionalProperties, function (value, key) {
            if (value._value.constructor === Array) {
                var tempObj = {};
                angular.forEach(value._value, function (valueInner, keyInner) {
                   // value._value[valueInner._name] = valueInner._value;
                    tempObj[valueInner._name] =valueInner._value;
                });
                
              //  value._value.splice(0, value._value.length);
                value._value = tempObj;

            }
            reservation[value._name] = value._value;
        })
        delete Reservation_Form.AdditionalProperties;
        delete reservation.Cancel_Reason;
        console.log(reservation)
        self.setReservationFormData(reservation);
        

    }

    self.UpdateReservationIsHide = function (reservation) {
        var data = {
            reservationId: reservation._id,
            isHideType: "IsHideClient",
            status:true
        }
        return $http.post(serviceBase + 'api/Reservation/UpdateReservationIsHide', data);
    }
    self.setSelectedReservation = function (reservationData) {
        localStorageService.set('selectedReservation', reservationData);
    }
    self.getSelectedReservation = function () {
            return localStorageService.get('selectedReservation');
    }
    self.setReservationType = function (reservationType) {
        localStorageService.set('reservationType', reservationType);
    }
    self.getReservationTypen = function () {
        return localStorageService.get('reservationType');
    }

    self.getValueByKey = function (dataObject, key) {
        var item = null;
        item = $filter('filter')(dataObject, { _name: key }, true)[0];
        if (item) {
            item = item._value;
        }
        return item;
    }
})


