angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.reservation-step1', {
               url: '/reservation-step1',
            views: {
                'menuContent': {
                    templateUrl: 'states/ambulance-reservation/step1/step1.html',
                    controller: 'Step1Ctrl'
                }
            },
          
           }).state('app.reservation-step2', {
               url: '/reservation-step2',
               views: {
                   'menuContent': {
                       templateUrl: 'states/ambulance-reservation/step2/step2.html',
                       controller: 'Step2Ctrl'
                   }
               },

           }).state('app.reservation-step3', {
               url: '/reservation-step3',
               views: {
                   'menuContent': {
                       templateUrl: 'states/ambulance-reservation/step3/step3.html',
                       controller: 'Step3Ctrl'
                   }
               },

           });


  

});