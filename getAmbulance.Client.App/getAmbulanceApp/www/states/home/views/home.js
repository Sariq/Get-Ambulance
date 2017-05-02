

angular.module('starter.controllers').controller('HomeCtrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state, $ionicPlatform, $cordovaLocalNotification, $rootScope) {



    $scope.goToReservationForm = function (reservationType) {
        if (localStorageService.get('reservationType') != reservationType) {
            ReservationService.deleteReservationFormDate();
        }
        localStorageService.set('reservationType', reservationType);
        $state.go('app.reservation-step1');
    }

    //$ionicPlatform.ready(function () {
    //    var now = new Date().getTime();
    //    var _10SecondsFromNow = new Date(now + 5 * 1000);
    //        $cordovaLocalNotification.schedule({
    //            id: 1,
    //            title: 'Title here',
    //            text: 'Text here',
    //            at:_10SecondsFromNow,
    //            data: {
    //                customProperty: 'custom value'
    //            }
    //        }).then(function (result) {
    //           alert('success')
    //        });

    //        $rootScope.$on('$cordovaLocalNotification:trigger',
    //function (event, notification, state) {
    //    alert('trigger');
    //});
    //        $rootScope.$on('$cordovaLocalNotification:click',
    //function (event, notification, state) {
    //    alert('click');
    //});
       
    //});

})


angular.module('starter.controllers').directive('heightWatcher',  function () {
    return {

        link: function (scope, elem, attrs) {
            scope.$watch(function () {
                return elem[0].clientHeight;
            },
            function (newValue, oldValue) {
 
                angular.element(document.querySelector('#main-container')).attr('style', 'margin-top: ' + (5 + newValue) + 'px');
  
               

                //}
            });
        }
    }
});