
(function () {
    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('wl-registration', {

                    url: '/wl-registration',
                    templateUrl: 'views/register/views/registration/wl-registration.html',
                    controller: 'WLRegistrationCtrl'
                })
    }
    angular.module('sbAdminApp')
      .config(['$stateProvider', '$urlRouterProvider', routes])
}());