/// <reference path="whiteLabel-service.js" />
'use strict';
angular.module('sbAdminApp').factory('WhiteLabelService', ['$http', 'ngAuthSettings', 'localStorageService', '$rootScope', '$q', '$filter', 'UserManagerService', function ($http, ngAuthSettings, localStorageService, $rootScope, $q, $filter, UserManagerService) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var WhiteLabelServiceFactory = {};
    var _getWhiteLabelData = function () {
        if (_getWhiteLabelDataLocal()) {
            var deferred = $q.defer();
            var data = {
                whiteLabelId: _getWhiteLabelDataLocal().whiteLabelid
            }
            $http.post(serviceBase + 'api/WhiteLabel/GetWhiteLabelData', data).success(function (res) {
                _setWhiteLabelData(res);
                $rootScope.$broadcast('whiteLabel-data-updated');
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    };

    var _getWhiteLabelById = function (whiteLabelId) {
            var deferred = $q.defer();
            var data = {
                whiteLabelId: whiteLabelId
            }
            $http.post(serviceBase + 'api/WhiteLabel/GetWhiteLabelById', data).success(function (res) {
                deferred.resolve(res);
            });
            return deferred.promise;
    };

    $rootScope.$on('update-whiteLabel-data', function (event, args) {
        _getWhiteLabelData();
    });

    var _updateWhiteLabelIsOnline = function (type,status) {
        var data = {
            isOnline: status,
            whiteLabelId: _getWhiteLabelDataLocal().whiteLabelid,
            type:type
        }
        return $http.post(serviceBase + 'api/WhiteLabel/UpdateWhiteLabelIsOnline', data);
    };

    var _setWhiteLabelsListLocal = function (WhiteLabelsList) {
        localStorageService.set('WhiteLabelsList', WhiteLabelsList);
    }
    var _getWhiteLabelsListLocal = function () {
        return localStorageService.get('WhiteLabelsList');
    }

    var _getWhiteLabelsList = function (status, type) {
        var deferred = $q.defer();
        return $http.post(serviceBase + 'api/WhiteLabel/GetWhiteLabelsList').then(function (res) {
            _setWhiteLabelsListLocal(res.data);
            $rootScope.$broadcast('whiteLabel-list-updated');
            deferred.resolve(res);
        })
        return deferred.promise;
    };



    var _setWhiteLabelData = function (data) {
        localStorageService.set('WhiteLabelData', data);
        _updateSupportedServicesOnRoot()
    };
    var _getWhiteLabelDataLocal = function () {
        return localStorageService.get('WhiteLabelData');
    };
    var _updateSupportedServicesOnRoot = function () {
        if (_getWhiteLabelDataLocal()) {
            var supportedServices = _getWhiteLabelDataLocal().supportedServices;
            if (supportedServices) {
                angular.forEach(supportedServices, function (value, key) {
                    switch (value.Type) {
                        case "1":
                            $rootScope.isAmbulanceCatSup = true;
                            break;
                        case "2":
                            $rootScope.isMedicalTherapistCatSup = true;
                            break;
                        case "3":
                            $rootScope.isStairsAssistanceCatSup = true;
                            break;
                        case "4":
                            $rootScope.isICUAmbulanceCatSup = true;
                            break;
                    }
                })
            }
        }
    };
    var _setSelctedWhiteLabelData = function (data) {
        localStorageService.set('SelectedWhiteLabelData', data);
    };
    var _getSelctedWhiteLabelData = function () {
        return localStorageService.get('SelectedWhiteLabelData');
    };
    var _getSupportedServicesByType = function (type) {
        var isSupportRole = UserManagerService.isSupportRole();

         if (!isSupportRole) {
             var supportedServices = _getWhiteLabelDataLocal().supportedServices;
             return $filter('filter')(supportedServices, { Type: type }, true)[0];
    } else {
             var supportedServices = _getSelctedWhiteLabelData().supportedServices;
             return $filter('filter')(supportedServices, { Type: type }, true)[0];
    }
       
    };

    var _getSupportedAreasByServiceType = function (type) {
        var supportedService = _getSupportedServicesByType(type);
        return supportedService.supportedAreas;
    };

    var _initSupportedServiceByType = function (type) {
        switch (type) {
            case '1':
                return {
                    "Type": "1",
                    "Name": "PrivateAmbulance",
                    "supportedAreas": [],
                    "isOnline": false,
                    "logo": "ambulance.svg"
                }
                break
            case '2':
                return {
                    "Type": "2",
                    "Name": "MedicalTherapist",
                    "supportedAreas": [],
                    "isOnline": false,
                    "logo": "doctor.svg"
                }
                break
            case '3':
                return {
                    "Type": "3",
                    "Name": "StairsAssistance",
                    "supportedAreas": [],
                    "isOnline": false,
                    "logo": "stairs.svg"
                }
                break
            case '4':
                return {
                    "Type": "4",
                    "Name": "ICUAmbulance",
                    "supportedAreas": [],
                    "isOnline": false,
                    "logo": "icu_ambulance.svg"
                }
                break
            case '5':
                return {
                    "Type": "5",
                    "Name": "StairsAssistance",
                    "supportedAreas": [],
                    "isOnline": false,
                    "logo": "stairs.svg"
                }
                break
        }

        var supportedServices = _getWhiteLabelDataLocal().supportedServices;
        return $filter('filter')(supportedServices, { Type: type }, true)[0];
    };

    var _isCanSetOnline = function (supportedService) {
        switch (supportedService.Type) {
            case '1':
                if (supportedService.prices.distance && supportedService.prices.distance.length > 0 && supportedService.prices.stairsBuilding && supportedService.prices.weight && supportedService.supportedAreas.length > 0) {
                    return true;
                }
                return false;
                break
            case '2':
                if (supportedService.prices.medicalTherapist && supportedService.supportedAreas.length > 0) {
                    return true;
                }
                return false;
                break
            case '3':
                if (supportedService.prices.stairsAssistance && supportedService.supportedAreas.length > 0) {
                    return true;
                }
                return false;
                break
            case '4':
                if (supportedService.prices.distance &&  supportedService.prices.distance.length > 0 && supportedService.supportedAreas.length > 0) {
                    return true;
                }
                return false;
                break
            //case '5':
            //    if (supportedService.prices.distance && supportedService.prices.stairsBuilding && supportedService.prices.weight) {
            //        return true;
            //    }
            //    return false;
                break
        }
    }
    
    var _setSelectedWhiteLabelId = function (id) {
        localStorageService.set('SelectedWhiteLabelId', id);
    }
    var _getSelectedWhiteLabelId = function () {
        return localStorageService.get('SelectedWhiteLabelId');
    }



    WhiteLabelServiceFactory.companyInputsList1 = [
      {
          name: "Wl_Name",
          model: "name",
          validator: "required",
          validMethod: "blur",
          isRequired: true,
          type: "text"
      },
      {

          name: "Wl_Description",
          model: "Description",
          validator: "required",
          validMethod: "blur",
          isRequired: true
      , type: "text"
      },
      {

          name: "Wl_LegalNumber",
          model: "LegalNumber",
          validator: "required,number",
          validMethod: "blur",
          isRequired: true
      , type: "number"
      },
      {

          name: "Wl_Address",
          model: "Address",
          validator: "required",
          validMethod: "blur",
          isRequired: true
      , type: "text"
      },
      {
          name: "Wl_City",
          model: "City",
          validator: "required",
          validMethod: "blur",
          isRequired: true
      , type: "text"
      },
      {
          name: "Wl_Postal_Code",
          model: "Postal_Code",
          validator: "required",
          validMethod: "blur",
          isRequired: true,
          type: "number"
      }
    ];

    WhiteLabelServiceFactory.companyInputsList2 = [
       {
           name: "Wl_Phone1",
           model: "phoneNumber",
           validator: "required",
           validMethod: "blur",
           isRequired: true
       , type: "number"
       },
       {

           name: "Wl_Phone2",
           model: "phoneNumber2",
           validator: "nothing",
           validMethod: "blur",
           isRequired: false
       , type: "number"
       },
       {

           name: "Wl_Phone3",
           model: "phoneNumber3",
           validator: "nothing",
           validMethod: "blur",
           isRequired: false
       , type: "number"
       },
       {

           name: "Wl_Fax",
           model: "Fax",
           validator: "nothing",
           validMethod: "blur",
           isRequired: false
       , type: "number"
       },
       {
           name: "Wl_Email",
           model: "Email",
           validator: "required,email",
           validMethod: "blur",
           isRequired: true
       , type: "text"
       },
       {
           name: "Wl_WebSite",
           model: "WebSite",
           validator: "nothing",
           validMethod: "blur",
           isRequired: false,
           type: "text"
       }
    ]

    WhiteLabelServiceFactory.initSupportedServiceByType = _initSupportedServiceByType;
    WhiteLabelServiceFactory.updateWhiteLabelIsOnline = _updateWhiteLabelIsOnline;
    WhiteLabelServiceFactory.setWhiteLabelData = _setWhiteLabelData;
    WhiteLabelServiceFactory.getWhiteLabelDataLocal = _getWhiteLabelDataLocal;
    WhiteLabelServiceFactory.getWhiteLabelData = _getWhiteLabelData;
    WhiteLabelServiceFactory.updateSupportedServicesOnRoot = _updateSupportedServicesOnRoot;
    WhiteLabelServiceFactory.getSupportedServicesByType = _getSupportedServicesByType;
    WhiteLabelServiceFactory.getSupportedAreasByServiceType = _getSupportedAreasByServiceType;
    WhiteLabelServiceFactory.isCanSetOnline = _isCanSetOnline;
    WhiteLabelServiceFactory.getWhiteLabelsList = _getWhiteLabelsList;
    WhiteLabelServiceFactory.getWhiteLabelsListLocal = _getWhiteLabelsListLocal;
    WhiteLabelServiceFactory.setWhiteLabelsListLocal = _setWhiteLabelsListLocal;
    WhiteLabelServiceFactory.setSelectedWhiteLabelId = _setSelectedWhiteLabelId;
    WhiteLabelServiceFactory.getSelectedWhiteLabelId = _getSelectedWhiteLabelId;
    WhiteLabelServiceFactory.getWhiteLabelById = _getWhiteLabelById;
    WhiteLabelServiceFactory.setSelctedWhiteLabelData = _setSelctedWhiteLabelData;
    WhiteLabelServiceFactory.getSelctedWhiteLabelData = _getSelctedWhiteLabelData;

    

    
    
    return WhiteLabelServiceFactory;

}]);