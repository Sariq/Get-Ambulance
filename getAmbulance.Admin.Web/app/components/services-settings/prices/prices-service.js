'use strict';
angular.module('sbAdminApp').factory('PricesService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', function ($http, ngAuthSettings, authService, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var PricesServiceFactory = {};
    
    var _updatePricesByCategory = function (category, updatedData, type) {

        var data = {
            "whiteLabelId": authService.authentication.WhiteLabelData.whiteLabelid,
            "category": category,
            "updatedData": updatedData,
            "type":type

        }
        return $http.post(serviceBase + 'api/WhiteLabel/UpdatePricesByCategory', data);
    };

    var _deletePricesByCategory = function (index) {

        var data = {
            "whiteLabelId": authService.authentication.WhiteLabelData.whiteLabelid,
            "category": "Private_Ambulance.distance." + index
                    }
        return $http.post(serviceBase + 'api/WhiteLabel/DeletePricesByCategory', data);
    };

    
    PricesServiceFactory.deletePricesByCategory = _deletePricesByCategory;

    PricesServiceFactory.updatePricesByCategory = _updatePricesByCategory;

    return PricesServiceFactory;

}]);