
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.icu-ambulance-reservation-list', {
               url: '/icu-ambulance-reservation-list',
               templateUrl: 'views/icu-ambulance/reservation/list/icu-ambulance-reservation-list.html',
               controller: 'AmbulanceReservationListCtrl'
           }).state('dashboard.icu-ambulance-prices', {
               url: '/icu-ambulance-prices',
               templateUrl: 'views/icu-ambulance/prices/icu-ambulance-prices.html',
               controller: 'IcuAmbulancePricesCtrl'
           })

});

