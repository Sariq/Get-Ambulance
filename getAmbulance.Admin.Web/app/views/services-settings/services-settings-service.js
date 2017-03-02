﻿'use strict';
angular.module('sbAdminApp').factory('ServicesSettingsService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', function ($http, ngAuthSettings, authService, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ServicesSettingsServiceFactory = {};
   
    var _AddSupportedAreas = function (areaData, type) {
        var supportedAreaList = [areaData];
        var data={ 
            whiteLabelId: authService.authentication.WhiteLabelData.whiteLabelid,
            supportedAreaList: supportedAreaList,
            type: type
        }
        return $http.post(serviceBase + 'api/WhiteLabel/AddSupportedAreas', data);
    };
    var _UpdateSupportedAreas = function (areaData, type, index) {
        var supportedAreaList = [areaData];
        var data = {
            whiteLabelId: authService.authentication.WhiteLabelData.whiteLabelid,
            supportedAreaList: supportedAreaList,
            type: type,
            index:index.toString()
        }
        return $http.post(serviceBase + 'api/WhiteLabel/UpdateSupportedAreas', data);
    };
    var _DeleteSupportedAreas = function (areaData, type) {
        var supportedAreaList = [areaData];
        var data = {
            whiteLabelId: authService.authentication.WhiteLabelData.whiteLabelid,
            supportedAreaList: supportedAreaList,
            type:type
        }
        return $http.post(serviceBase + 'api/WhiteLabel/DeleteSupportedAreas', data);
    };
   
    

    
 
    ServicesSettingsServiceFactory.AddSupportedAreas = _AddSupportedAreas;
    ServicesSettingsServiceFactory.UpdateSupportedAreas = _UpdateSupportedAreas;
    ServicesSettingsServiceFactory.DeleteSupportedAreas = _DeleteSupportedAreas;
    
 
    return ServicesSettingsServiceFactory;

}]);