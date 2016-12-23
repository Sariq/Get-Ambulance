
'use strict';
var supportedAreaCmp = ['$scope', '$http', 'Reservations', '$state','$timeout', function ($scope, $http, Reservations, $state, $timeout) {
    var ctrl = this;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        }, function (error) {
            console.log("Could not get location");
        });
    }

    ctrl.addMarker=function(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: {
                url: "/images/blue-marker.png",
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(50, 50)
            },
            map: $scope.map
        });
    }

    ctrl.cityCircle2 = null;
    ctrl.addAddressCircle = function (address,radius) {


            //var cityCircle = new google.maps.Circle({
            //    strokeColor: '#8299ae',
            //    strokeOpacity: 0.8,
            //    strokeWeight: 2,
            //    fillColor: '#91a0c3',
            //    fillOpacity: 0.35,
            //    map: $scope.map,
            //    center: latLng,
            //    radius: Math.sqrt(10) * 100,
            //    draggable: true
            //});



         
            //google.maps.event.addListener(cityCircle, 'dragend', function (res) {
            //    console.log(cityCircle.getCenter())
            //    $scope.map.setCenter(cityCircle.getCenter())
            //    console.log(cityCircle.getCenter().lat() + '-' + cityCircle.getCenter().lng())
            ////    if
            ////(google.maps.geometry.spherical.computeDistanceBetween(markers[0].position, cityCircle.getCenter()) <= cityCircle.getRadius()) {
            ////        console.log('=> is in searchArea');
            ////    } else {
            ////        console.log('=> is NOT in searchArea');
            ////    }
            //});
         
      
          
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {
                $scope.map.setCenter(results[0].geometry.location);
                    var latLng3 = new google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng);

                    var markers = [
           {
               position: results[0].geometry.location,
               type: 'info'
           }
                    ]
                    if (ctrl.cityCircle2)
                        ctrl.cityCircle2.setMap(null);
                    if (!radius) {
                        radius=Math.sqrt(10) * 100
                    } else {
                        radius = parseInt(radius);
                    }
                 ctrl.cityCircle2 = new google.maps.Circle({
                        strokeColor: '#8299ae',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#91a0c3',
                        fillOpacity: 0.35,
                        map: $scope.map,
                        center: results[0].geometry.location,
                        radius: radius,
                        draggable: true
                    });
                    for (var i = 0, feature; feature = markers[i]; i++) {
                        ctrl.addMarker(feature);
                    }
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
               
            });
        }
}]
angular.module('sbAdminApp').component('supportedAreaCmp', {
    bindings: {


    },
    templateUrl: 'components/supported-area/views/supported-area.html',
    controller: supportedAreaCmp
});
