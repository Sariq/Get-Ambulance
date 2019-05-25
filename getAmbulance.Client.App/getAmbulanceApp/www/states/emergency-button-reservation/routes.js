angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('app.emergency-button', {
            url: '/emergency-button',
            views: {
                'menuContent': {
                    templateUrl: 'states/emergency-button-reservation/step2/step2.html',
                    controller: 'EmergencyButtonStep2Ctrl'
                }
            },
          
        });
  

});