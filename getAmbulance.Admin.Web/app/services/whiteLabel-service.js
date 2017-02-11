/// <reference path="whiteLabel-service.js" />
'use strict';
angular.module('sbAdminApp').factory('WhiteLabelService', ['$http', 'ngAuthSettings', 'localStorageService', '$rootScope', '$q', function ($http, ngAuthSettings, localStorageService, $rootScope, $q) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var WhiteLabelServiceFactory = {};
    var _getWhiteLabelData = function () {
        if (_getWhiteLabelDataLocal()){
        var deferred = $q.defer();
        var data = {
            whiteLabelId: _getWhiteLabelDataLocal().whiteLabelid
        }
        $http.post(serviceBase + 'api/WhiteLabel/GetWhiteLabelData', data).success(function (res) {
            _setWhiteLabelData(res);
            $rootScope.$broadcast('whiteLabel-data-updated');
            deferred.resolve(res);
        });
        return deferred.promise;
        }
    };

  
    
    var _updateWhiteLabelIsOnline = function (status) {
        var data = {
            isOnline: status,
            whiteLabelId: _getWhiteLabelDataLocal().whiteLabelid
        } 
        return $http.post(serviceBase + 'api/WhiteLabel/UpdateWhiteLabelIsOnline', data);
    };


 

    var _setWhiteLabelData = function (data) {
        localStorageService.set('WhiteLabelData', data);
        _updateSupportedServicesOnRoot()
    };
    var _getWhiteLabelDataLocal = function () {
        return localStorageService.get('WhiteLabelData');
    };
    var _updateSupportedServicesOnRoot = function () {
        if (_getWhiteLabelDataLocal()){
        var supportedServices = _getWhiteLabelDataLocal().supportedServices;
        $rootScope.isAmbulanceCatSup = supportedServices.indexOf("1") > -1;
        $rootScope.isMedicalTherapistCatSup = supportedServices.indexOf("2") > -1;
        $rootScope.isStairsAssistanceCatSup = supportedServices.indexOf("3") > -1;
        }
    };

    WhiteLabelServiceFactory.updateWhiteLabelIsOnline = _updateWhiteLabelIsOnline;
    WhiteLabelServiceFactory.setWhiteLabelData = _setWhiteLabelData;
    WhiteLabelServiceFactory.getWhiteLabelDataLocal = _getWhiteLabelDataLocal;
    WhiteLabelServiceFactory.getWhiteLabelData = _getWhiteLabelData;

    WhiteLabelServiceFactory.updateSupportedServicesOnRoot = _updateSupportedServicesOnRoot;
    return WhiteLabelServiceFactory;

}]);