
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.ambulance-reservation-list', {
               url: '/ambulance-reservation-list',
               templateUrl: 'views/ambulance/reservation/list/ambulance-reservation-list.html',
               controller: 'AmbulanceReservationListCtrl'
           });
});

