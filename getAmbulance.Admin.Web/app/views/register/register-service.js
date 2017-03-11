'use strict';
angular.module('sbAdminApp').factory('RegisterService', ['$http', 'ngAuthSettings', 'WhiteLabelService', 'localStorageService', '$rootScope', '$q', '$filter', function ($http, ngAuthSettings, WhiteLabelService, localStorageService, $rootScope, $q, $filter) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var RegisterServiceFactory = {};
    var self=this;

    var _addWhiteLabel = function (wlForm) {
        var data = wlForm;
        return $http.post(serviceBase + 'api/WhiteLabel/AddWhiteLabel', data);
    };

    var _registerWhiteLabelUser = function (wlUserForm) {
        var data = wlUserForm;
        return $http.post(serviceBase + 'api/Account/Register', data);
    };
    
    RegisterServiceFactory.addWhiteLabel = _addWhiteLabel;
    RegisterServiceFactory.registerWhiteLabelUser = _registerWhiteLabelUser;

    
    return RegisterServiceFactory;

}]);