'use strict';
angular.module('sbAdminApp').factory('PricesService', ['$http', 'ngAuthSettings', 'authService', 'localStorageService', function ($http, ngAuthSettings, authService, localStorageService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var PricesServiceFactory = {};
    
    var _updatePricesByCategory = function (category) {

        var data = {
            "whiteLabelId": authService.authentication.WhiteLabelData.whiteLabelid,
            "category": category,
            "updatedData":15
            //"updatedData": {
            //    "20": {
            //        "day": "11",
            //        "night": "48"
            //    },
            //    "60": {
            //        "day": "48",
            //        "night": "51"
            //    }
            //},
        }
        return $http.post(serviceBase + 'api/WhiteLabel/UpdatePricesByCategory', data);
    };
    PricesServiceFactory.updatePricesByCategory = _updatePricesByCategory;

    return PricesServiceFactory;

}]);