'use strict';
angular.module('sbAdminApp').factory('WhiteLabelService', ['$http', 'ngAuthSettings', 'localStorageService', function ($http, ngAuthSettings, localStorageService) {

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
    };
    var _getWhiteLabelData = function () {
        return localStorageService.get('WhiteLabelData');
    };

    WhiteLabelServiceFactory.updateWhiteLabelIsOnline = _updateWhiteLabelIsOnline;
    WhiteLabelServiceFactory.setWhiteLabelData = _setWhiteLabelData;
    WhiteLabelServiceFactory.getWhiteLabelData = _getWhiteLabelData;
    return WhiteLabelServiceFactory;

}]);