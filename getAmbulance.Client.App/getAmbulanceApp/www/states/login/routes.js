angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('login', {
               url: '/login',
               templateUrl: 'states/login/views/login.html',
               controller: 'LogInCtrl'
           }).state('verify-code', {
               url: '/verify-code',
               templateUrl: 'states/login/views/verfiy-code/verfiy-code.html',
               controller: 'VerfiyCodeCtrl'
           });
  

});