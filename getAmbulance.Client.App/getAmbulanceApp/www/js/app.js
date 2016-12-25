// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'pascalprecht.translate','LocalStorageModule','ngCordova','validation','validation.rule','SignalR'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
   apiServiceBaseUri: 'http://localhost:54543/',
    //apiServiceBaseUri: 'http://ec2-35-160-57-240.us-west-2.compute.amazonaws.com/server/',
    //clientId: 'ngAuthApp'
 clientId: 'consoleApp',
 clientSecret: '123@abc'
}).config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider, $validationProvider, $httpProvider) {
    $validationProvider.showSuccessMessage = false;
    $translateProvider.preferredLanguage('he');
    $httpProvider.interceptors.push('authInterceptorService');
    $translateProvider.useStaticFilesLoader({
        prefix: 'translation/',
        suffix: '.json'
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
}).run( function (authService, $state, $timeout) {
    authService.fillAuthData();
    if (!authService.authentication.isAuth) {
        $timeout(function () {
            $state.go('login');
        });
     
    }
    console.log(authService)
});
