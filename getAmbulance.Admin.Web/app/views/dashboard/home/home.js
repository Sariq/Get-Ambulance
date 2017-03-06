

angular.module('sbAdminApp').controller('HomeCtrl', function ($scope, ReservationService, $filter, WhiteLabelService) {
  
    $scope.$on('updated-reservations-list', function (event, args) {
        $scope.reservationsList = ReservationService.getReservationsListLocal();
        $scope.filterByType();
    });

    $scope.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
    $scope.supportedServices = $scope.whiteLabel.supportedServices;
    $scope.supportedServicesTypesArr = [];
    angular.forEach($scope.supportedServices, function (value, key) {
        $scope.supportedServicesTypesArr.push(value.Type);
    });

    $scope.filterByType = function () {
        $scope.reservationsListFilterd = ReservationService.groupByType(($scope.reservationsList));
        angular.forEach($scope.reservationsListFilterd,function(value,key){
            $scope.reservationsListFilterd[key] = ReservationService.filterByStatus(value, '1');
        })
            if(!$scope.reservationsListFilterd['1']){
                $scope.reservationsListFilterd['1'] = [];
            }
            if (!$scope.reservationsListFilterd['2']) {
                $scope.reservationsListFilterd['2'] = [];
            }
            if (!$scope.reservationsListFilterd['3']) {
                $scope.reservationsListFilterd['3'] = [];
            }
            if (!$scope.reservationsListFilterd['4']) {
                $scope.reservationsListFilterd['4'] = [];
            }
   
      

    }


    

})


