

angular.module('starter.controllers').service('LogInService', function ($http,authService, ngAuthSettings, localStorageService, eReservationAdditionalProperties, $timeout, authService) {
    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    self.formData = {};
    


    self.setLogInData = function (logInData) {
        localStorageService.set('logInData', logInData);
    }

    self.getLogInData = function (logInData) {
        return localStorageService.get('logInData');
    }

  
})


