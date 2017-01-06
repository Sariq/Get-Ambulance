

angular.module('starter.controllers').controller('TermsAndConditionsCtrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state, $ionicPlatform, $cordovaLocalNotification, $rootScope) {



    $scope.goToLogin = function () {
        $state.go('login');
    }

})


