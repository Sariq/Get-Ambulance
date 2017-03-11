
(function () {
    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('wl-registration', {

                    url: '/wl-registration',
                    templateUrl: 'views/register/views/registration/wl-registration.html',
                    controller: 'WLRegistrationCtrl'
                }).state('confirm-email', {
                    url: '/confirm-email',
                  //  templateUrl: 'views/register/views/registration/confirm-email.html',
                    controller: 'ConfirmEmailCtrl'
                }).state('reset-password', {
                    url: '/reset-password',
                    templateUrl: 'views/register/views/reset-password/reset-password.html',
                    controller: 'ResetPasswordCtrl'
                })


        
    }
    angular.module('sbAdminApp')
      .config(['$stateProvider', '$urlRouterProvider', routes])
}());