'use strict';
angular.module('starter.controllers').factory('CommonService', ['$rootScope', '$q', 'ngAuthSettings', 'localStorageService', '$filter', '$ionicLoading', '$ionicPlatform', '$timeout', function ($rootScope, $q, ngAuthSettings, localStorageService, $filter, $ionicLoading, $ionicPlatform, $timeout) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var CommonServiceFactory = {};


    var _showLoader = function (WhiteLabelsList) {
        $ionicLoading.show({
            template: '<img src="../www/img/loading-logo.gif" class="loader-logo" />'
        });
    }
    var _hideLoader = function (WhiteLabelsList) {
        $timeout(function () {
            $ionicLoading.hide();
        });
    }


    var doCustomBack = function () {
        event.preventDefault();
    };
    var _deregisterHardBack = $ionicPlatform.registerBackButtonAction(function(e){
        doCustomBack(e), 101
    }
        
    );

    CommonServiceFactory.showLoader = _showLoader;
    CommonServiceFactory.hideLoader = _hideLoader;
    CommonServiceFactory.deregisterHardBack = _deregisterHardBack;

    return CommonServiceFactory;

}]);