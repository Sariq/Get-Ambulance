
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.reservation-item', {
               url: '/reservation-item',
               templateUrl: 'views/reservation/item/reservation-item.html',
               controller: 'ReservationItemCtrl'
        });
  

});