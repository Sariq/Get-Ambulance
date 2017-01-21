

angular.module('sbAdminApp').controller('HomeCtrl', function ($scope, ReservationService, $filter, WhiteLabelService) {
  
    $scope.$on('updated-reservations-list', function (event, args) {
        $scope.reservationsList = ReservationService.getReservationsListLocal();
        $scope.filterByType();
    });

    $scope.filterByType = function () {
        $scope.reservationsListFilterd = $filter('groupBy')($scope.reservationsList, "Type");
        console.log($scope.reservationsListFilterd)
    }

    WhiteLabelService.updateSupportedServicesOnRoot();
})


