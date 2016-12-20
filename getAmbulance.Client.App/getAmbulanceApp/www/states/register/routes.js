angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'states/home/views/home.html',
                    controller: 'HomeCtrl'
                }
            },
          
        });
  

});