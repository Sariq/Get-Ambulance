'use strict';
angular.module('sbAdminApp').factory('ClientsService', ['$rootScope', '$q', '$http', 'ngAuthSettings', 'authService', 'localStorageService', '$filter', 'ReservationService', 'WhiteLabelService', function ($rootScope,$q, $http, ngAuthSettings, authService, localStorageService, $filter, ReservationService, WhiteLabelService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ClientsServiceFactory = {};


    var _getClientsList = function () {
        //var deferred = $q.defer();
        //return $http.post(serviceBase + 'api/Client/GetClientsList').then(function (res) {
        //    $rootScope.$broadcast('client-list-updated');
        //    deferred.resolve(res);
        //})
        //return deferred.promise;
        return $http.post(serviceBase + 'api/Client/GetClientsList');
    };
    
    ClientsServiceFactory.getClientsList = _getClientsList;

    return ClientsServiceFactory;

}]);