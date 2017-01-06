

angular.module('starter.controllers').controller('AmbulanceStep2Ctrl', function ($scope, $ionicModal, ReservationService, localStorageService, $state) {
    $scope.headerInfoText = 'Header_Info_Common_Text';

    $scope.form = {};
    $scope.continueToStep3 = function () {
        ReservationService.mergeToFormData($scope.form);
        $state.go('app.ambulance-reservation-step3');
    }

})


angular.module('starter.controllers').filter('currentdate', ['$filter', function ($filter) {
    return function () {
        return $filter('date')(new Date(), 'yyyy-MM-dd');
    };
}])

angular.module('starter.controllers').filter('currenttime', ['$filter', function ($filter) {
    return function () {
        return $filter('date')(new Date(), 'HH-MM-SS');
    };
}])