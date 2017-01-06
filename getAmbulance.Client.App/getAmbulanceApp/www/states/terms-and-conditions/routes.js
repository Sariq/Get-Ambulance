angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('terms-and-conditions', {
               url: '/terms-and-conditions',
               templateUrl: 'states/terms-and-conditions/views/terms-and-conditions.html',
               controller: 'TermsAndConditionsCtrl'
           });
  

});