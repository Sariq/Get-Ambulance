
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('dashboard.statistics', {
               url: '/statistics/:type',
               templateUrl: 'views/statistics/views/statistics.html',
               controller: 'StatisticsCtrl'
           });
});

