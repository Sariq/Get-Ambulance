angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.facebook', {
               url: '/facebook',
            views: {
                'menuContent': {
                    templateUrl: 'states/side-menu/facebook/facebook.html'
                }
            },
          
        });
  

});