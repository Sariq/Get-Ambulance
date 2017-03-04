
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.ambulance-reservation-list', {
               url: '/ambulance-reservation-list',
               templateUrl: 'views/ambulance/reservation/list/ambulance-reservation-list.html',
               controller: 'AmbulanceReservationListCtrl'
           }).state('dashboard.ambulance-prices', {
               url: '/ambulance-prices',
               templateUrl: 'views/ambulance/prices/ambulance-prices.html',
               controller: 'AmbulancePricesCtrl'
           })
    //    .state('dashboard.supported-area', {
           //    url: '/supported-area',
           //    templateUrl: 'views/ambulance/supported-area/supported-area.html',
           //    controller: 'SupportedAreaCtrl'
           //})
        .state('dashboard.supported-area', {
               url: '/supported-area/:type',
               templateUrl: 'views/ambulance/supported-area/supported-area.html',
               controller: 'SupportedAreaCtrl'
           });
});

