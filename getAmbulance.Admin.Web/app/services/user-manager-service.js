/// <reference path="whiteLabel-service.js" />
'use strict';
angular.module('sbAdminApp').factory('UserManagerService', ['$http', 'ngAuthSettings', 'localStorageService', '$rootScope', '$q', '$filter', 'eUserRole', function ($http, ngAuthSettings, localStorageService, $rootScope, $q, $filter, eUserRole) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var UserManagerService = {};

    var _setUserData = function (data) {
        localStorageService.set('UserData', data);
    };

    var _getUserData = function () {
        return localStorageService.get('UserData');
    };
    var _isSupportRole = function () {
        var userData = _getUserData();
        if (userData) {
            if (userData.role == eUserRole.Support) {
                return true;
            }
            return false;
        };
    }

    UserManagerService.setUserData = _setUserData;
    UserManagerService.getUserData = _getUserData;
    UserManagerService.isSupportRole = _isSupportRole;
    return UserManagerService;

}]);