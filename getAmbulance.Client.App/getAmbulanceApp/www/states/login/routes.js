angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.login', {
               url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'states/login/views/login.html',
                    controller: 'LogInCtrl'
                }
            },
          
        });
  

});