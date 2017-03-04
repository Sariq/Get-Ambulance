/// <reference path="whiteLabel-service.js" />
'use strict';
angular.module('sbAdminApp').factory('WhiteLabelService', ['$http', 'ngAuthSettings', 'localStorageService', '$rootScope', '$q', '$filter', function ($http, ngAuthSettings, localStorageService, $rootScope, $q, $filter) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var WhiteLabelServiceFactory = {};
    var _getWhiteLabelData = function () {
        if (_getWhiteLabelDataLocal()) {
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

    var _updateWhiteLabelIsOnline = function (type,status) {
        var data = {
            isOnline: status,
            whiteLabelId: _getWhiteLabelDataLocal().whiteLabelid,
            type:type
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

    var _getSupportedServicesByType = function (type) {
        var supportedServices = _getWhiteLabelDataLocal().supportedServices;
        return $filter('filter')(supportedServices, { Type: type }, true)[0];
    };

    var _getSupportedAreasByServiceType = function (type) {
        var supportedService = _getSupportedServicesByType(type);
        return supportedService.supportedAreas;
    };

    var _initSupportedServiceByType = function (type) {
        switch (type) {
            case '1':
                return {
                    "Type": "1",
                    "Name": "PrivateAmbulance",
                    "supportedAreas": [],
                    "isOnline": true,
                    "logo": "ambulance.svg"
                }
                break
            case '2':
                return {
                    "Type": "2",
                    "Name": "MedicalTherapist",
                    "supportedAreas": [],
                    "isOnline": true,
                    "logo": "doctor.svg"
                }
                break
            case '3':
                return {
                    "Type": "3",
                    "Name": "StairsAssistance",
                    "supportedAreas": [],
                    "isOnline": true,
                    "logo": "stairs.svg"
                }
                break
            case '4':
                return {
                    "Type": "4",
                    "Name": "ICUAmbulance",
                    "supportedAreas": [],
                    "isOnline": true,
                    "logo": "icu_ambulance.svg"
                }
                break
            case '5':
                return {
                    "Type": "5",
                    "Name": "StairsAssistance",
                    "supportedAreas": [],
                    "isOnline": true,
                    "logo": "stairs.svg"
                }
                break
        }

        var supportedServices = _getWhiteLabelDataLocal().supportedServices;
        return $filter('filter')(supportedServices, { Type: type }, true)[0];
    };

    WhiteLabelServiceFactory.initSupportedServiceByType = _initSupportedServiceByType;
    WhiteLabelServiceFactory.updateWhiteLabelIsOnline = _updateWhiteLabelIsOnline;
    WhiteLabelServiceFactory.setWhiteLabelData = _setWhiteLabelData;
    WhiteLabelServiceFactory.getWhiteLabelDataLocal = _getWhiteLabelDataLocal;
    WhiteLabelServiceFactory.getWhiteLabelData = _getWhiteLabelData;
    WhiteLabelServiceFactory.updateSupportedServicesOnRoot = _updateSupportedServicesOnRoot;
    WhiteLabelServiceFactory.getSupportedServicesByType = _getSupportedServicesByType;
    WhiteLabelServiceFactory.getSupportedAreasByServiceType = _getSupportedAreasByServiceType;

    return WhiteLabelServiceFactory;

}]);