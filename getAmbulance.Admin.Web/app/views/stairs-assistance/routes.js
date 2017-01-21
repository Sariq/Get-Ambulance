
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.stairs-assistance-reservation-list', {
               url: '/stairs-assistance-reservation-list',
               templateUrl: 'views/stairs-assistance/reservation/list/stairs-assistance-reservation-list.html',
               controller: 'StairsAssistanceReservationListCtrl'
           });
});

