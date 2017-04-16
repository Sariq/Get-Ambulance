

angular.module('starter.controllers').service('BugReportService', function ($http,authService, ngAuthSettings, localStorageService, eReservationAdditionalProperties, $timeout, authService) {
    var self = this;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var BugReportServiceFactory = {};

    var _SendBugReport = function (form) {
        var data = {
            From: form.From,
            Body: form.Body,
            AppCode:1
        }
        return $http.post(serviceBase + 'api/BugReport/AddBugReport', data);
    };
    BugReportServiceFactory.SendBugReport = _SendBugReport;
    return BugReportServiceFactory;
})


