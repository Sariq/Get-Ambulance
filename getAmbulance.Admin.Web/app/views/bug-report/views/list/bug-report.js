
angular.module('sbAdminApp').controller('BugReportListCtrl', function ($scope, BugReportService, $state) {

    $scope.GetBugReportList = function () {
        BugReportService.GetBugReportList().then(function (res) {
            $scope.BugReportList = res.data;
        });
    }
    $scope.GetBugReportList();
    $scope.goToItem = function (report) {
        BugReportService.setSelectedReport(report);
        $state.go('dashboard.bug-report-item');
    }
    
})
