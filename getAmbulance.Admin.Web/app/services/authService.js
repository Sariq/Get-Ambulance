'use strict';
angular.module('sbAdminApp').factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$location', '$state', '$rootScope', 'WhiteLabelService', function ($http, $q, localStorageService, ngAuthSettings, $location, $state, $rootScope, WhiteLabelService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: true
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        if (_authentication.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId;
            if (ngAuthSettings.clientSecret) {
                data = data + "&client_secret=" + ngAuthSettings.clientSecret;
            }
        }

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

          
            var data = {
                userName: loginData.userName
            }
            var authorizationData={};

            if (_authentication.useRefreshTokens) {
                authorizationData={ token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true };
               
            }
            else {
                authorizationData = { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false };

                
            }
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            //IF not Admin
            if (_authentication.userName != 'ambulance.admin@gmail.com') {
       
                $http.post(serviceBase + 'api/WhiteLabel/GetWhiteLabelData', data).success(function (res) {
                    WhiteLabelService.setWhiteLabelData(res);
                    _authentication.WhiteLabelData = (res);
                    console.log(_authentication.WhiteLabelData);
                authorizationData.WhiteLabelData = _authentication.WhiteLabelData;
                localStorageService.set('authorizationData', authorizationData);
                WhiteLabelService.updateSupportedServicesOnRoot();
                deferred.resolve(response);
            });
            } else {
                _authentication.WhiteLabelData = { "whiteLabelid": "0" };
                authorizationData.WhiteLabelData = _authentication.WhiteLabelData;
                localStorageService.set('authorizationData', authorizationData);
                deferred.resolve(response);
            }

            

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = _authentication.useRefreshTokens;
        $location.path('/login');


    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
            _authentication.WhiteLabelData = authData.WhiteLabelData;
        }

    };

    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true, WhiteLabelData: authData.WhiteLabelData });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };
    var _reLoadState = function () {
        $state.reload();
        $rootScope.$broadcast('state-reloaded-after-refreshToken');
    }
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;
    authServiceFactory.reLoadState = _reLoadState;
    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);