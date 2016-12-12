angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'states/map/views/map.html',
                    controller: 'MapCtrl'
                }
            },
          
        });
  

});