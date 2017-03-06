'use strict';
angular.module('sbAdminApp').factory('RegisterService', ['$http', 'ngAuthSettings', 'WhiteLabelService', 'localStorageService', '$rootScope', '$q', '$filter', function ($http, ngAuthSettings, WhiteLabelService, localStorageService, $rootScope, $q, $filter) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var RegisterServiceFactory = {};
    var self=this;

    var _addWhiteLabel = function () {
        var data = {};
        return $http.post(serviceBase + 'api/WhiteLabel/AddWhiteLabel', data);
    };
   
    RegisterServiceFactory.addWhiteLabel = _addWhiteLabel;
    return RegisterServiceFactory;

}]);