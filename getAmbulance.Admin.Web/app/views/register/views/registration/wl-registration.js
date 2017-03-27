

angular.module('sbAdminApp').controller('WLRegistrationCtrl', function ($scope, RegisterService, $rootScope) {

    $scope.wlForm = {};
    $scope.wlUserForm = { IsInvoiceByMail: false, IsServicesOffer: false };


    $scope.companyInputsList1 = [
        {
            name: "Wl_Name",
            model: "name",
            validator: "required",
            validMethod: "blur",
            isRequired: true,
            type: "text"
        },
        {

            name: "Wl_Description",
            model: "Description",
            validator: "required",
            validMethod: "blur",
            isRequired: true
        , type: "text"
        },
        {

            name: "Wl_LegalNumber",
            model: "LegalNumber",
            validator: "required,number",
            validMethod: "blur",
            isRequired: true
        , type: "number"
        },
        {

            name: "Wl_Address",
            model: "Address",
            validator: "required",
            validMethod: "blur",
            isRequired: true
        , type: "text"
        },
        {
            name: "Wl_City",
            model: "City",
            validator: "required",
            validMethod: "blur",
            isRequired: true
        , type: "text"
        },
        {
            name: "Wl_Postal_Code",
            model: "Postal_Code",
            validator: "required",
            validMethod: "blur",
            isRequired: true,
            type: "number"
        }
    ];

    $scope.companyInputsList2 = [
       {
           name: "Wl_Phone1",
           model: "phoneNumber",
           validator: "required",
           validMethod: "blur",
           isRequired: true
       , type: "number"
       },
       {

           name: "Wl_Phone2",
           model: "phoneNumber2",
           validator: "nothing",
           validMethod: "blur",
           isRequired: false
       , type: "number"
       },
       {

           name: "Wl_Phone3",
           model: "phoneNumber3",
           validator: "nothing",
           validMethod: "blur",
           isRequired: false
       , type: "number"
       },
       {

           name: "Wl_Fax",
           model: "Fax",
           validator: "nothing",
           validMethod: "blur",
           isRequired: false
       , type: "number"
       },
       {
           name: "Wl_Email",
           model: "Email",
           validator: "required,email",
           validMethod: "blur",
           isRequired: true
       , type: "text"
       },
       {
           name: "Wl_WebSite",
           model: "WebSite",
           validator: "nothing",
           validMethod: "blur",
           isRequired: false,
           type: "text"
       }
    ]

    $scope.userInputsList = [
        {
            name: "User_Name",
            name2: "Wl_Email",
            model: "Email",
            validator: "required,email",
            validMethod: "blur",
            type: "text",
            isRequired: true
        },
        {

            name: "Password",
            model: "Password",
            validator: "required,checkpassword",
            validMethod: "blur",
            type: "password",
            isRequired: true
        }
           // ,
        //{

        //    name: "Confirm_Password",
        //    model: "ConfirmPassword",
        //    validator: "required",
        //    validMethod: "blur",
        //    type: "password",
        //    isRequired: true
        //}
    ]
    $scope.isRegisterSuccess = true;
    $scope.isWlRegisterSuccess = true;
    $scope.addWL = function () {
        $rootScope.isLoading = true;
        RegisterService.addWhiteLabel($scope.wlForm).then(function (res) {
            $scope.addWLUser(res.data.whiteLabelid);
        }, function (err) {
            if (err.data == 0) {
                $scope.isWlRegisterSuccess = false;
                $scope.wlRegisterErrMsg = 'WL_Already_Exist';
            }
            $rootScope.isLoading = false;
        });
    }
    $scope.addWLUser = function (whiteLabelid) {
        $scope.wlUserForm.whiteLabelid = whiteLabelid;
        RegisterService.registerWhiteLabelUser($scope.wlUserForm).then(function (res) {
            $scope.isRegisterSuccess = true;
        }, function (err) {
            $scope.isRegisterSuccess = false;
            $rootScope.isLoading = false;
        });
    }
    $scope.validateWlUserForm = function () {

    }
    $scope.form = {
        submit: function (form, form2) {

        }
    };

    $scope.openTermsDialog = function () {
      window.open("docs/pdf/provider-terms-and-conditions.pdf")
    }
    

})
var compareTo = function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};

angular.module('sbAdminApp').directive("compareTo", compareTo);

