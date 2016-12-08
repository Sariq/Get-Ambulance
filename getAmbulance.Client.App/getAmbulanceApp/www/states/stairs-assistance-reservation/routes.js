angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.stairs-assistance-reservation-step2', {
               url: '/stairs-assistance-reservation-step2',
               views: {
                   'menuContent': {
                       templateUrl: 'states/stairs-assistance-reservation/step2/step2.html',
                       controller: 'StairsAssistanceStep2Ctrl'
                   }
               },

           }).state('app.stairs-assistance-reservation-step3', {
               url: '/stairs-assistance-reservation-step3',
               views: {
                   'menuContent': {
                       templateUrl: 'states/stairs-assistance-reservation/step3/step3.html',
                       controller: 'StairsAssistanceStep3Ctrl'
                   }
               },

           });


  

});