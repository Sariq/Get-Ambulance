

angular.module('starter.controllers').service('MapService', function ($q,$http, authService, ngAuthSettings, localStorageService, eReservationAdditionalProperties, $timeout, authService) {
    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
 
    

    var geocoder = new google.maps.Geocoder();

    self.getLatLangByAddress = function (address) {
        var deferred = $q.defer();
       
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                deferred.resolve({
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                });
            
            } else {
                deferred.reject('Geocode was not successful for the following reason: ' + status);
               // alert('Geocode was not successful for the following reason: ' + status);
            }

        });
        return deferred.promise;
       
    }

  
})


