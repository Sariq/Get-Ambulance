
angular.module('sbAdminApp').controller('BugReportItemCtrl', function ($scope, BugReportService, $state, WhiteLabelService) {



    $scope.getSelectedReport = function () {
        $scope.Report = BugReportService.getSelectedReport();
        WhiteLabelService.GetClientBasicInfoById($scope.Report.From.Id).then(function (res) {
            $scope.Client = res.data;
        })
    }
    $scope.getSelectedReport();
})
angular.module('sbAdminApp').filter('ageFilter', function () {
    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - new Date(birthday).getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function (birthdate) {
        return calculateAge(birthdate);
    };
});