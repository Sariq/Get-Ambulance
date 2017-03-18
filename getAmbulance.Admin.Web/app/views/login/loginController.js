'use strict';
angular.module('sbAdminApp').controller('loginController', ['$scope', '$location', 'authService', 'ngAuthSettings', 'RegisterService', '$state', 'WhiteLabelService', function ($scope, $location, authService, ngAuthSettings, RegisterService, $state, WhiteLabelService) {
   
    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {
        $scope.errMessage = false;
        authService.login($scope.loginData).then(function (response) {
            $scope.whiteLabel = WhiteLabelService.getWhiteLabelDataLocal();
            $scope.supportedServices = $scope.whiteLabel.supportedServices;
            if ($scope.supportedServices && $scope.supportedServices.length > 0) {
                $state.go('dashboard.home');
            } else {
                $state.go('dashboard.services-settings');
            }
           

        },
         function (err) {
             $scope.errMessage = true;
         });
    };

    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };
    $scope.forgotPassowrd = function () {
        $scope.errMessage = false;
        RegisterService.ForgotPassowrd($scope.loginData.userName).then(function (res) {
            $scope.isForgotPassowrdSent = true;
        });
    }
    

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/orders');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }
}]);
