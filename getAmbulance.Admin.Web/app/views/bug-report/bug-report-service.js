
angular.module('sbAdminApp').factory('BugReportService', ['$http', 'ngAuthSettings', 'WhiteLabelService', 'localStorageService', '$rootScope', '$q', '$filter', function ($http, ngAuthSettings, WhiteLabelService, localStorageService, $rootScope, $q, $filter) {

    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var BugReportServiceFactory = {};

    var _GetBugReportList = function (form) {

        return $http.post(serviceBase + 'api/BugReport/GetBugReportList');
    };


    var _setSelectedReport=function(report){
        localStorageService.set('selectedReport', report);
    }
    var _getSelectedReport = function () {
        return localStorageService.get('selectedReport');
    }
    BugReportServiceFactory.GetBugReportList = _GetBugReportList;
    BugReportServiceFactory.setSelectedReport = _setSelectedReport;
    BugReportServiceFactory.getSelectedReport = _getSelectedReport;

    return BugReportServiceFactory;
}]);
