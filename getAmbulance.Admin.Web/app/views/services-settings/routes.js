
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.services-settings', {
               url: '/services-settings',
               templateUrl: 'views/services-settings/views/services-settings.html',
               controller: 'ServicesSettingsCtrl'
           }).state('dashboard.supported-area', {
               url: '/supported-area/:type',
               templateUrl: 'views/services-settings/views/supported-area/supported-area.html',
               controller: 'SupportedAreaCtrl'
           });
});

