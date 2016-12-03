'use strict';
angular.module('sbAdminApp').factory('WhiteLabelService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', function ($http, ngAuthSettings, authService, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var WhiteLabelServiceFactory = {};
    
    var _updateWhiteLabelIsOnline = function (status) {
        var data = {
            isOnline: status,
            whiteLabelId: authService.authentication.WhiteLabelData.whiteLabelid
        } 
        return $http.post(serviceBase + 'api/WhiteLabel/UpdateWhiteLabelIsOnline', data);
    };

    WhiteLabelServiceFactory.updateWhiteLabelIsOnline = _updateWhiteLabelIsOnline;

    return WhiteLabelServiceFactory;

}]);