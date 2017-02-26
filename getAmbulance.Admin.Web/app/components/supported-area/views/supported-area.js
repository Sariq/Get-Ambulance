
'use strict';
var supportedAreaCmp = ['$scope', '$http', '$state', '$timeout', 'WhiteLabelService', 'ServicesSettingsService', function ($scope, $http, $state, $timeout, WhiteLabelService, ServicesSettingsService) {
    var ctrl = this;

    ctrl.whiteLabelData = angular.copy(WhiteLabelService.getWhiteLabelDataLocal());
  
 
    ctrl.km = 1000;
    $scope.$on('whiteLabel-data-updated', function (event, args) {
        ctrl.deleteMapCircles();
        ctrl.whiteLabelData = angular.copy(WhiteLabelService.getWhiteLabelDataLocal());
        angular.forEach(ctrl.whiteLabelData.supportedAreas, function (value, key) {
            ctrl.addAddressCircle(value);
        });
    });


    ctrl.deleteMapCircles = function () {
        angular.forEach(ctrl.whiteLabelData.supportedAreas, function (value, key) {
            value.circle.setRadius(null);
            value.marker.setMap(null);
        });
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            ctrl.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
            angular.forEach(ctrl.whiteLabelData.supportedAreas, function (value, key) {
                ctrl.addAddressCircle(value);
            });
        }, function (error) {

            angular.forEach(ctrl.whiteLabelData.supportedAreas, function (value, key) {
                ctrl.addAddressCircle(value);
            });
            console.log("Could not get location");
        });
    }

    ctrl.addMarker = function (area) {
        
        area.marker = new google.maps.Marker({
            position: { lat: area.lat, lng: area.lng },
            icon: {
                url: "../img/blue-marker.png",
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(50, 50)
            },
            map: ctrl.map
        });
    }

    ctrl.cityCircle2 = null;
    ctrl.addAddressCircle = function (area) {

            //google.maps.event.addListener(cityCircle, 'dragend', function (res) {
            //    console.log(cityCircle.getCenter())
            //    ctrl.map.setCenter(cityCircle.getCenter())
            //    console.log(cityCircle.getCenter().lat() + '-' + cityCircle.getCenter().lng())
            ////    if
            ////(google.maps.geometry.spherical.computeDistanceBetween(markers[0].position, cityCircle.getCenter()) <= cityCircle.getRadius()) {
            ////        console.log('=> is in searchArea');
            ////    } else {
            ////        console.log('=> is NOT in searchArea');
            ////    }
            //});
          
          
          //  var geocoder = new google.maps.Geocoder();

          //  geocoder.geocode({ 'address': address }, function (results, status) {
            //    if (status === 'OK') {
                    ctrl.map.setCenter({lat: area.lat, lng:area.lng});
                   // var latLng3 = new google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng);
                     
                   var radius=area.radius;
                    if (ctrl.cityCircle2)
                        ctrl.cityCircle2.setMap(null);
                    if (!radius) {
                        radius=Math.sqrt(10) * 100
                    } else {
                        radius = parseInt(radius);
                    }
                 
                    //ctrl.areaData.name = address;
                    //ctrl.areaData.lat = results[0].geometry.location.lat();
                    //ctrl.areaData.lng = results[0].geometry.location.lng();
                    //ctrl.areaData.radius = radius;
                    area.circle = new google.maps.Circle({
                        strokeColor: '#8299ae',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#91a0c3',
                        fillOpacity: 0.35,
                        map: ctrl.map,
                        center: { lat: area.lat, lng: area.lng },
                        radius: radius * ctrl.km,
                        draggable: true
                    });
                 //   for (var i = 0, feature; feature = markers[i]; i++) {
                    ctrl.addMarker(area);
                  //  }
                //} else {
                //    alert('Geocode was not successful for the following reason: ' + status);
                //}
               
           // });
                     
    }

    ctrl.addNewArea = function (address,radius) {
        if (address){
        var geocoder = new google.maps.Geocoder();

          geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                ctrl.map.setCenter(results[0].geometry.location);
        // var latLng = new google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng);

         var area = {
             name: address,
             radius: radius,
             lat: results[0].geometry.location.lat(),
             lng: results[0].geometry.location.lng()
         }
         ctrl.selectedArea = area;
         ctrl.addAddressCircle(area);
         ctrl.addSupportedAreas(area);
         ctrl.map.setCenter(area.circle.getCenter())
          //}
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }

         });
        }
    }

    ctrl.addTmpc = function (area) {
        var geocoder = new google.maps.Geocoder();
        area.radius = ctrl.slider.value;
        geocoder.geocode({ 'address': area.name }, function (results, status) {
            if (status === 'OK') {
                ctrl.map.setCenter(results[0].geometry.location);
                // var latLng = new google.maps.LatLng(results[0].geometry.location.lat, results[0].geometry.location.lng);

                ctrl.selectedArea = {
                    name: area.name,
                    radius: area.radius,
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
    
                ctrl.addAddressCircle(ctrl.selectedArea);
            }
        })
    }
    ctrl.addSupportedAreas = function (area) {
        var temp_area = {};
        temp_area.name = area.name;
        temp_area.lat = area.lat;
        temp_area.lng = area.lng;
        temp_area.radius = area.radius;
        ServicesSettingsService.AddSupportedAreas(temp_area);
    }
    ctrl.updateSupportedAreas = function () {

        var temp_area = {};
        temp_area.name = ctrl.selectedArea.name;
        temp_area.lat = ctrl.selectedArea.lat;
        temp_area.lng = ctrl.selectedArea.lng;
        temp_area.radius = ctrl.selectedArea.radius;
         ServicesSettingsService.UpdateSupportedAreas(temp_area);
    }

    ctrl.deleteSupportedAreas = function (area) {
        area.circle.setRadius(null);
        area.marker.setMap(null);
        var temp_area = {};
        temp_area.name = area.name;
        temp_area.lat = area.lat;
        temp_area.lng = area.lng;
        temp_area.radius = area.radius;
        ServicesSettingsService.DeleteSupportedAreas(temp_area);
    }

    ctrl.updateCircle = function (area) {
        area.circle.setRadius(null);
        area.circle.setRadius(area.radius * ctrl.km);
    }
    ctrl.valueChanged = function () {
        ctrl.selectedArea.radius =ctrl.slider.value;
        ctrl.updateCircle(ctrl.selectedArea);
    }
    ctrl.deleteTmpCircle = function () {
        if (ctrl.selectedArea) {
            ctrl.selectedArea.circle.setRadius(null);
            ctrl.selectedArea.marker.setMap(null);
        }
 
    }
    ctrl.slider = {
        value: 5,
        options: {
            floor: 1,
            onChange: function (id) {
                ctrl.valueChanged()
            },
            ceil: 10,
            step: 1,
            minLimit: 1,
            maxLimit: 10
        }
    };

    ctrl.areaChanged = function (area) {
        ctrl.selectedArea = area;
        ctrl.slider.value = ctrl.selectedArea.radius;
        ctrl.areaChangedCircleColor(area);
    }

    ctrl.areaChangedCircleColor = function (area) {
        angular.forEach(ctrl.whiteLabelData.supportedAreas, function (value, key) {
            value.circle.setOptions({
                strokeColor: '#8299ae',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#91a0c3',
            })
        });
        ctrl.selectedArea.circle.setOptions({
            strokeColor: 'green',
            fillColor: 'green'
        })

        ctrl.map.setCenter(area.circle.getCenter())
    }
 
}]
angular.module('sbAdminApp').component('supportedAreaCmp', {
    bindings: {

        

    },
    templateUrl: 'components/supported-area/views/supported-area.html',
    controller: supportedAreaCmp
});
