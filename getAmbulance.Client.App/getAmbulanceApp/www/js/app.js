// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var apiService = '';
window.isLocalHost = false;
switch (location.host) {
    case 'localhost:57867':
        apiService = 'http://localhost:54543/';
        window.isLocalHost = true;
        break;
    case 'localhost:51904':
        apiService = 'http://localhost:54543/';
        window.isLocalHost = true;
        break;
    case 'qaprovider.getambulance.com':
        apiService = 'http://ec2-54-186-14-31.us-west-2.compute.amazonaws.com/';
        break;
    case 'provider.getambulance.com':
        apiService = 'http://GetAmbulance-LoadBalancer-1286247522.us-west-2.elb.amazonaws.com/';
        break;
    default:
        apiService = 'https://qaprovider.getambulance.com/';
        break;

}
angular.module('starter', ['ionic', 'starter.controllers', 'pascalprecht.translate', 'LocalStorageModule', 'ngCordova', 'validation', 'validation.rule', 'SignalR', 'angular.filter', 'google.places', 'angularFileUpload', 'ionic.cloud'])

.run(function ($ionicPlatform, $ionicDeploy, $rootScope) {
    $ionicPlatform.ready(function () {
        
        $rootScope.$broadcast('device:ready');

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}).constant('ngAuthSettings', {
 //  apiServiceBaseUri: 'http://localhost:54543/',
    apiServiceBaseUri: apiService,
    //clientId: 'ngAuthApp'
 clientId: 'consoleApp',
 clientSecret: '123@abc'
}).config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider, $validationProvider, $httpProvider, $ionicCloudProvider) {

    $ionicCloudProvider.init({
        "core": {
            "app_id": "bba3259e"
        }
    });

    $validationProvider.showSuccessMessage = false;
    $translateProvider.preferredLanguage('he');
    $httpProvider.interceptors.push('authInterceptorService');
    $translateProvider.useStaticFilesLoader({
        prefix: 'translation/',
        suffix: '.json'
    });
    angular.extend($validationProvider, { 
        validCallback: function (element) {
            $(element).parents('.item-input').removeClass('has-error');
        },
        invalidCallback: function (element) {
            $(element).parents('.item-input').addClass('has-error');
        }
    });
    $ionicConfigProvider.backButton.previousTitleText(false).text(' ');
  $stateProvider

  //  .state('app', {
  //  url: '/app',
  //  abstract: true,
  //  templateUrl: 'templates/side-menu.html',
  //  controller: 'SideMenu'
  //})

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlist', {
      url: '/playlist',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
      

  
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/home');
}).run(function (authService, $state, $timeout, WhiteLabelService, ReservationHub, $ionicDeploy, $interval) {
    $ionicDeploy.channel = 'production';
    authService.fillAuthData();
    if (!authService.authentication.isAuth) {
        $timeout(function () {
            $state.go('terms-and-conditions');
        });
    } else {
       ReservationHub.connectReservationHub();
       WhiteLabelService.getWhiteLabelsList();
       $state.go('app.home');
    }
    var ionicDeployCheck = function () {
        $ionicDeploy.check().then(function (snapshotAvailable) {
            if (snapshotAvailable) {
                return $ionicDeploy.extract();

            }
        }, function (err) {
            console.log(err);
        });
    }


    $interval(function () { ionicDeployCheck(); }, 60000, false);



});
