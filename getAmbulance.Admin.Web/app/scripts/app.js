'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var apiService = '';
switch (location.host) {
    case 'localhost:57867':
        apiService = location.protocol + '//localhost:54543/'
        break;
    case 'provider.getambulance.com':
        apiService = location.protocol + '//provider.getambulance.com/'
        break;
    case 'qaprovider.getambulance.com':
        apiService = location.protocol + '//qaprovider.getambulance.com/'
        break;
}
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'ui.toggle',
    'angular-loading-bar',
    'LocalStorageModule',
    'SignalR',
    'pascalprecht.translate',
    'angular.filter',
    'ngTable',
    'ngSanitize',
    'timer',
    'ngDialog',
    'rzModule',
    'google.places',
    'validation',
    'validation.rule',
    'chart.js',
    'angularFileUpload',
    'mwl.calendar'

  ]).constant('ngAuthSettings', {
      // apiServiceBaseUri: 'http://localhost:54543/',
      apiServiceBaseUri: apiService,
      clientId: 'ngAuthApp'
      // clientId: 'consoleApp',
      // clientSecret: '123@abc'
  }).config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider', '$translateProvider', '$validationProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, $translateProvider, $validationProvider) {
      $httpProvider.interceptors.push('authInterceptorService');
      $translateProvider.preferredLanguage('he');
      $translateProvider.useStaticFilesLoader({
          prefix: 'translation/',
          suffix: '.json'
      });
      $validationProvider.showSuccessMessage = false;
      $validationProvider
        .setExpression({
            nothing: function (value, scope, element, attrs, param) {
                return true;
            }

        }).setDefaultMsg({
            nothing: {
                error: 'Need to be bigger',
                success: 'Thanks!'
            }
        });
      $validationProvider.setExpression({
          checkpassword: function (value, scope, element, attrs, param) {
              if (value != undefined && value != '') {
                  var regExp = /^(?=.*[a-zA-Z])(?=.*\d)[^\W_]{6,15}$/;
                  var res = regExp.test(value);
                  console.log(res)
                  return res;
              } else { return true }

          }
      }).setDefaultMsg({
          checkpassword: {

          }
      });
      $validationProvider.setExpression({
          checkConfirmPassword: function (value, scope, element, attrs, param) {
              return value == scope.wlUserForm.Password;
          }
      }).setDefaultMsg({
          checkConfirmPassword: {

          }
      });
      angular.extend($validationProvider, {
          validCallback: function (element) {
              $(element).parents('.item-input').removeClass('has-error');
          },
          invalidCallback: function (element) {
              $(element).parents('.item-input').addClass('has-error');
          }
      });
      $ocLazyLoadProvider.config({
          debug: false,
          events: true,
      });
      configureDefaults.$inject = ["ngTableDefaults"];

      function configureDefaults(ngTableDefaults) {
          ngTableDefaults.params.count = 5;
          ngTableDefaults.settings.counts = [];
      }
      $urlRouterProvider.otherwise('/dashboard/home');

      $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/main.html',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                    {
                        name: 'sbAdminApp',
                        files: [
                        'scripts/directives/header/header.js',
                        'scripts/directives/header/header-notification/header-notification.js',
                        'scripts/directives/sidebar/sidebar.js',
                        'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                        ]
                    }),
                    $ocLazyLoad.load(
                    {
                        name: 'toggle-switch',
                        files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                               "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                        ]
                    }),
                    $ocLazyLoad.load(
                    {
                        name: 'ngAnimate',
                        files: ['bower_components/angular-animate/angular-animate.js']
                    })
                    $ocLazyLoad.load(
                    {
                        name: 'ngCookies',
                        files: ['bower_components/angular-cookies/angular-cookies.js']
                    })
                    $ocLazyLoad.load(
                    {
                        name: 'ngResource',
                        files: ['bower_components/angular-resource/angular-resource.js']
                    })
                    $ocLazyLoad.load(
                    {
                        name: 'ngSanitize',
                        files: ['bower_components/angular-sanitize/angular-sanitize.js']
                    })
                    $ocLazyLoad.load(
                    {
                        name: 'ngTouch',
                        files: ['bower_components/angular-touch/angular-touch.js']
                    })
                }
            }
        })
        .state('dashboard.home', {
            url: '/home',
            controller: 'HomeCtrl',
            templateUrl: 'views/dashboard/home/home.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                        'scripts/controllers/main.js',
                        'scripts/directives/timeline/timeline.js',
                        'scripts/directives/notifications/notifications.js',
                        'scripts/directives/chat/chat.js',
                        'scripts/directives/dashboard/stats/stats.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.form', {
            templateUrl: 'views/form.html',
            url: '/form'
        })
        .state('dashboard.blank', {
            templateUrl: 'views/pages/blank.html',
            url: '/blank'
        })
      //  .state('login',{
      //    templateUrl:'views/pages/login.html',
      //    url:'/login'
      //})
        .state('dashboard.chart', {
            templateUrl: 'views/chart.html',
            url: '/chart',
            controller: 'ChartCtrl',
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'chart.js',
                        files: [
                          'bower_components/angular-chart.js/dist/angular-chart.min.js',
                          'bower_components/angular-chart.js/dist/angular-chart.css'
                        ]
                    }),
                    $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: ['scripts/controllers/chartContoller.js']
                    })
                }
            }
        })
        .state('dashboard.table', {
            templateUrl: 'views/table.html',
            url: '/table'
        })
        .state('dashboard.panels-wells', {
            templateUrl: 'views/ui-elements/panels-wells.html',
            url: '/panels-wells'
        })
        .state('dashboard.buttons', {
            templateUrl: 'views/ui-elements/buttons.html',
            url: '/buttons'
        })
        .state('dashboard.notifications', {
            templateUrl: 'views/ui-elements/notifications.html',
            url: '/notifications'
        })
        .state('dashboard.typography', {
            templateUrl: 'views/ui-elements/typography.html',
            url: '/typography'
        })
        .state('dashboard.icons', {
            templateUrl: 'views/ui-elements/icons.html',
            url: '/icons'
        })
        .state('dashboard.grid', {
            templateUrl: 'views/ui-elements/grid.html',
            url: '/grid'
        })
  }]).run(['authService', '$state', 'WhiteLabelService', 'ReservationHub', '$timeout', '$location', function (authService, $state, WhiteLabelService, ReservationHub, $timeout, $location) {

      authService.fillAuthData();
      if ((!authService.authentication.isAuth || !WhiteLabelService.getWhiteLabelDataLocal())) {
          if ($location.$$path != "/wl-registration" && $location.$$path != '/confirm-email' && $location.$$path != '/reset-password') {
              $timeout(function () {
                  $state.go('login')
              });
          }
      }
      else {
          ReservationHub.connectReservationHub();
          WhiteLabelService.updateSupportedServicesOnRoot();
      }
      //MobileService.isMobileByScreenWidth();
      //MobileService.isTabletByScreenWidth();
      //window.addEventListener("orientationchange", function () {
      //    $timeout(function () {
      //        MobileService.isMobileByScreenWidth();
      //        MobileService.isTabletByScreenWidth();
      //    }, 1000);
      //});
  }]);


