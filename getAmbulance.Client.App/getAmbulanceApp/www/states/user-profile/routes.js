angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
             .state('app.user-profile', {
                 url: '/user-profile',
                 views: {
                     'menuContent': {
                         templateUrl: 'states/user-profile/views/user-profile/user-profile.html',
                         controller: 'UserProfileCtrl'
                     }
                 },

             });
  

});