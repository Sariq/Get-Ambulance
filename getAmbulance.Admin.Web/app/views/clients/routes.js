
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('dashboard.clients-list', {
                url: '/clients-list',
                templateUrl: 'views/clients/views/clients-list.html',
                controller: 'ClientsListrCtrl'
           });
});

