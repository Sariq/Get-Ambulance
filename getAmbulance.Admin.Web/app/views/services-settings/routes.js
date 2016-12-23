
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.services-settings', {
               url: '/services-settings',
               templateUrl: 'views/services-settings/views/services-settings.html',
               controller: 'ServicesSettingsCtrl'
           });
});

