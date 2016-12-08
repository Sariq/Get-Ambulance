angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.medical-therapist-reservation-step2', {
               url: '/medical-therapist-reservation-step2',
               views: {
                   'menuContent': {
                       templateUrl: 'states/medical-therapist-reservation/step2/step2.html',
                       controller: 'MedicalTherapistStep2Ctrl'
                   }
               },

           }).state('app.medical-therapist-reservation-step3', {
               url: '/medical-therapist-reservation-step3',
               views: {
                   'menuContent': {
                       templateUrl: 'states/medical-therapist-reservation/step3/step3.html',
                       controller: 'MedicalTherapistStep3Ctrl'
                   }
               },

           });


  

});