'use strict';
angular.module('sbAdminApp').factory('WhiteLabelService', ['$http', 'ngAuthSettings', 'localStorageService','$rootScope', function ($http, ngAuthSettings, localStorageService, $rootScope) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var WhiteLabelServiceFactory = {};
    
    var _updateWhiteLabelIsOnline = function (status) {
        var data = {
            isOnline: status,
            whiteLabelId: _getWhiteLabelData().whiteLabelid
        } 
        return $http.post(serviceBase + 'api/WhiteLabel/UpdateWhiteLabelIsOnline', data);
    };
    var _setWhiteLabelData = function (data) {
        localStorageService.set('WhiteLabelData', data);
        _updateSupportedServicesOnRoot()
    };
    var _getWhiteLabelData = function () {
        return localStorageService.get('WhiteLabelData');
    };
    var _updateSupportedServicesOnRoot = function () {
        if (_getWhiteLabelData()){
        var supportedServices = _getWhiteLabelData().supportedServices;
        $rootScope.isAmbulanceCatSup = supportedServices.indexOf("1") > -1;
        $rootScope.isMedicalTherapistCatSup = supportedServices.indexOf("2") > -1;
        $rootScope.isStairsAssistanceCatSup = supportedServices.indexOf("3") > -1;
        }
    };

    WhiteLabelServiceFactory.updateWhiteLabelIsOnline = _updateWhiteLabelIsOnline;
    WhiteLabelServiceFactory.setWhiteLabelData = _setWhiteLabelData;
    WhiteLabelServiceFactory.getWhiteLabelData = _getWhiteLabelData;
    WhiteLabelServiceFactory.updateSupportedServicesOnRoot = _updateSupportedServicesOnRoot;
    return WhiteLabelServiceFactory;

}]);