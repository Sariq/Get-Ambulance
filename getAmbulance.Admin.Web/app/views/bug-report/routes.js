
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.bug-report-list', {
               url: '/bug-report-list',
               templateUrl: 'views/bug-report/views/list/bug-report.html',
               controller: 'BugReportListCtrl'
           }).state('dashboard.bug-report-item', {
               url: '/bug-report-item',
               templateUrl: 'views/bug-report/views/item/bug-report.html',
               controller: 'BugReportItemCtrl'
           });
});

