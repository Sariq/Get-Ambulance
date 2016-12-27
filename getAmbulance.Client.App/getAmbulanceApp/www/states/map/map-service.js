

angular.module('starter.controllers').service('MapService', function ($q,$http, authService, ngAuthSettings, localStorageService, eReservationAdditionalProperties, $timeout, authService) {
    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
 
    

    var geocoder = new google.maps.Geocoder();

    self.getLatLangByAddress = function (addressNameList) {
        var deferred = $q.defer();
        var addressLatLngList = [];
        var count = 0;
        angular.forEach(addressNameList, function (value, key) {
            geocoder.geocode({ 'address': value }, function (results, status) {
                if (status === 'OK') {
                    addressLatLngList.push({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    })

                    count++;
                    if (count == addressNameList.length) {
                        deferred.resolve(addressLatLngList);
                    }
                   

                } else {
                    deferred.reject('Geocode was not successful for the following reason: ' + status);
                    // alert('Geocode was not successful for the following reason: ' + status);
                }

            });
        })

        return deferred.promise;
       
    }

  
})


