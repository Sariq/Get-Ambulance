'use strict';
angular.module('starter.controllers').factory('CommonService', ['$rootScope', '$q', 'ngAuthSettings', 'localStorageService', '$filter', '$ionicLoading', '$ionicPlatform', '$timeout','$location', function ($rootScope, $q, ngAuthSettings, localStorageService, $filter, $ionicLoading, $ionicPlatform, $timeout, $location) {

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
    function setIsMobileBrowser(flag) {
        localStorageService.set('isMobileBrowser', flag);
    };
   
    var _getIsMobileBrowser = function () {
        return localStorageService.get('isMobileBrowser');
    }
    function getParameterByName(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var _mobilebrowsercheck = function () {
        var check = false;
        var isMobileBrowser = getParameterByName('isMobileBrowser');
        if (isMobileBrowser) {
            check = true;
        } else {
            check = false;
        }
        $rootScope.isMobileBrowser = check;
        setIsMobileBrowser(check);
        //return check;
    };
    CommonServiceFactory.showLoader = _showLoader;
    CommonServiceFactory.hideLoader = _hideLoader;
    CommonServiceFactory.deregisterHardBack = _deregisterHardBack;
    CommonServiceFactory.mobilebrowsercheck = _mobilebrowsercheck;
    CommonServiceFactory.getIsMobileBrowser = _getIsMobileBrowser;

    return CommonServiceFactory;

}]);