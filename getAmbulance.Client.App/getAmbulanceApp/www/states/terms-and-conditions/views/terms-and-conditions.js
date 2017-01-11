

angular.module('starter.controllers').controller('TermsAndConditionsCtrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state, $ionicPlatform, $cordovaLocalNotification, $rootScope) {

    $scope.headerInfoText = 'Header_Info_Common_Text';
    $scope.isReadTermsAndConditions = false;
    $scope.setTIsReadTermsAndConditions = function () {
        $scope.isReadTermsAndConditions = !$scope.isReadTermsAndConditions;
    }
    $scope.goToLogin = function () {
        $state.go('login');
    }

})


