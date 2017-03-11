'use strict';
angular.module('sbAdminApp').factory('RegisterService', ['$http', 'ngAuthSettings', 'WhiteLabelService', 'localStorageService', '$rootScope', '$q', '$filter', function ($http, ngAuthSettings, WhiteLabelService, localStorageService, $rootScope, $q, $filter) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var RegisterServiceFactory = {};
    var self = this;

    var _addWhiteLabel = function (wlForm) {
        var data = wlForm;
        return $http.post(serviceBase + 'api/WhiteLabel/AddWhiteLabel', data);
    };

    var _registerWhiteLabelUser = function (wlUserForm) {
        var data = wlUserForm;
        return $http.post(serviceBase + 'api/Account/Register', data);
    };
    var _ConfirmEmail = function (userId, code) {
        var data = {
            userId: encodeURI(userId),
            code: encodeURI(code)
        };
        return $http.post(serviceBase + 'api/Account/ConfirmEmail', data);
    };
    var _ResetPassword = function (resetPassForm) {
        var data = resetPassForm;
        return $http.post(serviceBase + 'api/Account/ResetPassword', data);
    };
    var _ForgotPassowrd = function (email) {
        var data = {
            Email: email
        };
        return $http.post(serviceBase + 'api/Account/WhiteLabelForgotPassword', data);
    };
    
    


    RegisterServiceFactory.addWhiteLabel = _addWhiteLabel;
    RegisterServiceFactory.registerWhiteLabelUser = _registerWhiteLabelUser;
    RegisterServiceFactory.ConfirmEmail = _ConfirmEmail;
    RegisterServiceFactory.ResetPassword = _ResetPassword;
    RegisterServiceFactory.ForgotPassowrd = _ForgotPassowrd;

    



    return RegisterServiceFactory;

}]);