
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.whitelabel-list', {
               url: '/whitelabel-list',
               templateUrl: 'views/whitelabel/views/list/whitelabel-list.html',
               controller: 'WhiteLabelListCtrl'
           }).state('dashboard.whitelabel-item', {
               url: '/whitelabel-item',
               templateUrl: 'views/whitelabel/views/item/whitelabel-item.html',
               controller: 'WhiteLabelItemCtrl'
           });
});

