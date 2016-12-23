'use strict';
angular.module('sbAdminApp').factory('ServicesSettingsService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', function ($http, ngAuthSettings, authService, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ServicesSettingsServiceFactory = {};
   
    var _UpdateSupportedAreas = function (status, type) {
        var supportedAreaList = [{
            "name": "tira22",
            "radius": 316.227766016838,
            "lat": 33.23823691911867,
            "lng": 35.944726969285284
        }];
        var data={ 
            whiteLabelId: authService.authentication.WhiteLabelData.whiteLabelid,
            supportedAreaList: supportedAreaList
        }
        return $http.post(serviceBase + 'api/WhiteLabel/AddSupportedAreas', data);
    };
   
    ServicesSettingsServiceFactory.UpdateSupportedAreas = _UpdateSupportedAreas;
    return ServicesSettingsServiceFactory;

}]);