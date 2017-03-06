
(function () {
    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('login', {

                    url: '/login',
                    templateUrl: 'views/login/login.html',
                    controller: 'loginController'
                })
    }
    angular.module('sbAdminApp')
      .config(['$stateProvider', '$urlRouterProvider', routes])
}());
