angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.whitelabel-offers-list', {
               url: '/whitelabel-offers-list',
            views: {
                'menuContent': {
                    templateUrl: 'states/whitelabel-offers-list/views/whitelabel-offers-list.html',
                    controller: 'WhiteLabelOffersListCtrl'
                }
            },
          
        });
  

});