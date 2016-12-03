angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.reservation-form', {
            url: '/reservation-form',
            views: {
                'menuContent': {
                    templateUrl: 'states/reservation-form/reservation-form.html',
                    controller: 'ReservationCtrl'
                }
            },
          
        });
  

});