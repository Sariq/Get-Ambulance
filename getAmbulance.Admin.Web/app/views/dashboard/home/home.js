

angular.module('sbAdminApp').controller('HomeCtrl', function ($scope, ReservationService, $filter, WhiteLabelService) {
  
    $scope.$on('updated-reservations-list', function (event, args) {
        $scope.reservationsList = ReservationService.getReservationsListLocal();
        $scope.filterByType();
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
       
   
      

    }


    

})


