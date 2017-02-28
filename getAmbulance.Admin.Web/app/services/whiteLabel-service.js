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

    $rootScope.$on('update-whiteLabel-data', function (event, args) {
        _getWhiteLabelData();
    });
    
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
        if (_getWhiteLabelDataLocal()) {
            var supportedServices = _getWhiteLabelDataLocal().supportedServices;
            if (supportedServices) {
                angular.forEach(supportedServices, function (value, key) {
                    switch (value.Type) {
                        case "1":
                            $rootScope.isAmbulanceCatSup = true;
                            break;
                        case "2":
                            $rootScope.isMedicalTherapistCatSup = true;
                            break;
                        case "3":
                            $rootScope.isStairsAssistanceCatSup = true;
                            break;
                        case "4":
                            $rootScope.isICUAmbulanceCatSup = true;
                            break;
                    }
                })
            }
        }
    };

    WhiteLabelServiceFactory.updateWhiteLabelIsOnline = _updateWhiteLabelIsOnline;
    WhiteLabelServiceFactory.setWhiteLabelData = _setWhiteLabelData;
    WhiteLabelServiceFactory.getWhiteLabelDataLocal = _getWhiteLabelDataLocal;
    WhiteLabelServiceFactory.getWhiteLabelData = _getWhiteLabelData;

    WhiteLabelServiceFactory.updateSupportedServicesOnRoot = _updateSupportedServicesOnRoot;
    return WhiteLabelServiceFactory;

}]);