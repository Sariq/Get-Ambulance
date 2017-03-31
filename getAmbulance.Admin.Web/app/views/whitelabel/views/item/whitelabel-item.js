'use strict';

angular.module('sbAdminApp')
  .controller('WhiteLabelItemCtrl', function ($scope, ngDialog, WhiteLabelService) {

      $scope.getWhiteLabelById = function () {
          $scope.selectedWhiteLabelId = WhiteLabelService.getSelectedWhiteLabelId();
          WhiteLabelService.getWhiteLabelById($scope.selectedWhiteLabelId).then(function (res) {
              $scope.whiteLabel = res;
          })

      }

      $scope.companyInputsList1 = WhiteLabelService.companyInputsList1;
      $scope.companyInputsList2 = WhiteLabelService.companyInputsList2;

      $scope.getWhiteLabelById();
      $scope.$on('whiteLabel-data-updated', function (event, args) {
          $scope.getWhiteLabelById();
      });

  });
