'use strict';
angular.module('starter.controllers').factory('WhiteLabelService', ['$rootScope', '$q', '$http', 'ngAuthSettings', 'authService', 'localStorageService', '$filter', function ($rootScope,$q, $http, ngAuthSettings, authService, localStorageService, $filter) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var WhiteLabelServiceFactory = {};
    
    var _getWhiteLabelsList = function (status, type) {
        var deferred = $q.defer();
        return $http.post(serviceBase + 'api/WhiteLabel/GetWhiteLabelsList').then(function (res) {
           _setWhiteLabelsListLocal(res.data);
            $rootScope.$broadcast('whiteLabel-list-updated');
            deferred.resolve(res);
        })
        return deferred.promise;
    };

    var _setWhiteLabelsListLocal = function (WhiteLabelsList) {
        localStorageService.set('WhiteLabelsList', WhiteLabelsList);
    }
    var _getWhiteLabelsListLocal = function () {
        return localStorageService.get('WhiteLabelsList');
    }

    var _convertWLIdToFullWLData = function (whiteLabelId) {
        var whiteLabelsList = _getWhiteLabelsListLocal();
        var item = null;
         item = $filter('filter')(whiteLabelsList, { whiteLabel_Id: whiteLabelId }, true)
        if (item) {
            item= item[0];
        }
           
        return item;
    }
    WhiteLabelServiceFactory.getWhiteLabelsList = _getWhiteLabelsList;
    WhiteLabelServiceFactory.setWhiteLabelsListLocal = _setWhiteLabelsListLocal;
    WhiteLabelServiceFactory.getWhiteLabelsListLocal = _getWhiteLabelsListLocal;
    WhiteLabelServiceFactory.convertWLIdToFullWLData = _convertWLIdToFullWLData
  
    return WhiteLabelServiceFactory;

}]);