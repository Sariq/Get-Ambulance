angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
     

    .state('app.bug-report', {
        url: '/bug-report',
        views: {
            'menuContent': {
                templateUrl: 'states/bug-report/views/bug-report.html',
                controller: 'BugReportCtrl'
            }
        },
          
    })

});