angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.reservation-list', {
               url: '/reservation-list',
            views: {
                'menuContent': {
                    templateUrl: 'states/reservation/views/list/reservations-list.html',
                    controller: 'ReservationListCtrl'
                }
            },
          
           }).state('app.reservation-item', {
               url: '/reservation-item',
               views: {
                   'menuContent': {
                       templateUrl: 'states/reservation/views/item/reservation-item.html',
                       controller: 'ReservationItemCtrl'
                   }
               },

           });
  

});