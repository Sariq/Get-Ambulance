angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('login', {
               url: '/login',
               templateUrl: 'states/login/views/login.html',
               controller: 'LogInCtrl'
        
          
        });
  

});