

angular.module('starter.controllers').controller('BugReportCtrl', function ($ionicPopup, $scope, authService, ngAuthSettings, $state, LogInService, BugReportService, UserProfileService) {
    $scope.headerInfoText = 'Header_Info_Common_Text';

    $scope.userProfile = UserProfileService.getUserProfileLocal();

    $scope.form = {};
    $scope.form.From={
        Name:$scope.userProfile.Full_Name,
        Id: $scope.userProfile._id
    }

    $scope.SendBugReport = function () {
        BugReportService.SendBugReport($scope.form).then(function (res) {
            $scope.isSendSuccess = true;

        });
    }

})


