'use strict';
angular.module('sbAdminApp').factory('CommonService', ['$q', 'ngAuthSettings', '$location', 'localStorageService', function ($q, ngAuthSettings, $location, localStorageService) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var commonServiceFactory = {};

    var _getStateByServiceType = function (type) {
        switch (type) {
            case '1':
                return 'dashboard.ambulance-reservation-list'
                break;
            case '2':
                return 'dashboard.medical-therapist-reservation-list'
                break;
            case '3':
                return 'dashboard.stairs-assistance-reservation-list'
                break;
            case '4':
                return 'dashboard.icu-ambulance-reservation-list'
                break;
            case '5':
                return 'dashboard.emergency-button'
                break;
        }
      
    }
    var _getUploadLogoUrl = function () {
        return serviceBase + 'api/WhiteLabel/UploadWhiteLabelLogo';
    }

    
  
    commonServiceFactory.getStateByServiceType = _getStateByServiceType;
    commonServiceFactory.getUploadLogoUrl = _getUploadLogoUrl;


    return commonServiceFactory;
}]);