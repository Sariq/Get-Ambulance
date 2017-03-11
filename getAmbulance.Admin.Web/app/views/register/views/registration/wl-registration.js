

angular.module('sbAdminApp').controller('WLRegistrationCtrl', function ($scope, RegisterService) {
  
    $scope.wlForm = {};
    $scope.wlUserForm = { IsInvoiceByMail: false, IsServicesOffer: false };

    
    $scope.companyInputsList1 = [
        {
            name: "Wl_Name",
            model: "name",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {

            name: "Wl_Description",
            model: "Description",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {

            name: "Wl_LegalNumber",
            model: "LegalNumber",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {

            name: "Wl_Address",
            model: "Address",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {
            name: "Wl_City",
            model: "City",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {
            name: "Wl_Postal_Code",
            model: "Postal_Code",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        }
    ];

    $scope.companyInputsList2 = [
       {
           name: "Wl_Phone1",
           model: "phoneNumber",
           validator: "required",
           validMethod: "submit",
           isRequired: true
       },
       {

           name: "Wl_Phone2",
           model: "phoneNumber2",
           validator: "required",
           validMethod: "submit",
           isRequired: false
       },
       {

           name: "Wl_Phone3",
           model: "phoneNumber3",
           validator: "required",
           validMethod: "submit",
           isRequired: false
       },
       {

           name: "Wl_Fax",
           model: "Fax",
           validator: "required",
           validMethod: "submit",
           isRequired: false
       },
       {
           name: "Wl_Email",
           model: "Email",
           validator: "required",
           validMethod: "submit",
           isRequired: true
       },
       {
           name: "Wl_WebSite",
           model: "WebSite",
           validator: "required",
           validMethod: "submit",
           isRequired: false
       }
    ]

    $scope.userInputsList = [
        {
            name: "User_Name",
            model: "Email",
            validator: "required",
            validMethod: "submit",
            type:"text",
            isRequired: true
        },
        {

            name: "Password",
            model: "Password",
            validator: "required",
            validMethod: "submit",
            type: "password",
            isRequired: true
        },
        {

            name: "Confirm_Password",
            model: "ConfirmPassword",
            validator: "required",
            validMethod: "submit",
            type: "password",
            isRequired: true
        }
        ]
    $scope.addWL = function () {
        RegisterService.addWhiteLabel($scope.wlForm).then(function (res) {
            $scope.addWLUser(res.data.whiteLabelid);
        });
    }
    $scope.addWLUser = function (whiteLabelid) {
        $scope.wlUserForm.whiteLabelid = whiteLabelid;
        RegisterService.registerWhiteLabelUser($scope.wlUserForm);
    }
    
})


