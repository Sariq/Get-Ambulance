

angular.module('starter.controllers').controller('MapCtrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state, $ionicPlatform, $cordovaLocalNotification, $rootScope, $cordovaGeolocation) {
    var options = { timeout: 10000, enableHighAccuracy: true };

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var latLng2 = new google.maps.LatLng(33.239389599999996, 35.950278);

        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: $scope.map,
            center: latLng,
            radius: Math.sqrt(10) * 100,
            draggable: true
        });
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
            parking: {
                icon: iconBase + 'parking_lot_maps.png'
            },
            library: {
                icon: iconBase + 'library_maps.png'
            },
            info: {
                icon: iconBase + 'info-i_maps.png'
            }
        };
        function addMarker(feature) {
            var marker = new google.maps.Marker({
                position: feature.position,

                icon: {
                    url: "../www/img/ambulance-white.png",
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(90, 90)
                },
                map: $scope.map
            });
        }
        var features = [
         {
             position: latLng,
             type: 'info'
         }, {
             position: latLng2,
             type: 'info'
         }
        ]
      //var  searchAreaMarker = new google.maps.Marker({
      //      position: latLng,
      //      map: $scope.map,
      //      draggable: true,
      //      animation: google.maps.Animation.DROP,
      //      title: 'searchAreaMarker'
      //  });
        for (var i = 0, feature; feature = features[i]; i++) {
            addMarker(feature);
        }
        google.maps.event.addListener(cityCircle, 'dragend', function (res) {
            console.log(cityCircle.getCenter())
            $scope.map.setCenter(cityCircle.getCenter())

            if
            (google.maps.geometry.spherical.computeDistanceBetween(features[0].position, cityCircle.getCenter()) <= cityCircle.getRadius()) {
                console.log('=> is in searchArea');
            } else {
                console.log('=> is NOT in searchArea');
            }
        });
    }, function (error) {
        console.log("Could not get location");
    });

    $scope.goToReservationForm = function (reservationType) {
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


