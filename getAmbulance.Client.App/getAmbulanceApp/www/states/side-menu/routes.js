angular.module('starter.controllers').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider


    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'states/side-menu/side-menu.html',
        controller: 'SideMenu'
    });
  

});