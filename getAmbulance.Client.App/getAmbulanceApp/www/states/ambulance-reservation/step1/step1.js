

angular.module('starter.controllers').controller('Step1Ctrl', function (UserProfileService, $scope, $ionicModal, ReservationService, localStorageService, $state, $translate, $filter) {
    $scope.headerInfoText = 'Header_Info_Common_Text';

        switch (localStorageService.get('reservationType')) {
            case '1':
                    $scope.titleText = 'Private_Ambulance_Reservation';
                break;
            case '2':
                    $scope.titleText = 'Medical_Therapist_Reservation';
                break;
            case '3':
                    $scope.titleText = 'Stairs_AssistanceReservation';
                break;
        }
     

        var storageFormData=ReservationService.getReservationFormData();
        if (storageFormData) {
            $scope.form = storageFormData;
        } else {
            $scope.form = {};
        }

    $scope.userProfile = UserProfileService.getUserProfileLocal();
    $scope.form.Full_Name=$scope.userProfile.Full_Name;
    $scope.form.Id_Number = parseInt($scope.userProfile.Id_Number, 10);
    $scope.form.Phone_Number = $scope.userProfile.User_Name;
    $scope.form.Age =   $filter('ageFilter')($scope.userProfile.Date_Of_Birth);
    $scope.continueToStep2 = function () {
        ReservationService.mergeToFormData($scope.form);
       
        switch (localStorageService.get('reservationType')) {
            case '1':
                $state.go('app.ambulance-reservation-step2');
                break;
            case '2':
                $state.go('app.medical-therapist-reservation-step2');
                break;
            case '3':
                $state.go('app.stairs-assistance-reservation-step2');
                break;
        }
       
      
    }

})


