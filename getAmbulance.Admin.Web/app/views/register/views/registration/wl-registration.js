

angular.module('sbAdminApp').controller('WLRegistrationCtrl', function ($scope, RegisterService) {
  
    $scope.wlForm ={};
    $scope.companyInputsList1 = [
        {
            name: "Wl_Name",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {

            name: "Wl_Description",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {

            name: "Wl_LegalNumber",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {

            name: "Wl_Address",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {
            name: "Wl_City",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        },
        {
            name: "Wl_Mekod",
            validator: "required",
            validMethod: "submit",
            isRequired: true
        }
    ];

    $scope.companyInputsList2 = [
       {
           name: "Wl_Phone1",
           validator: "required",
           validMethod: "submit",
           isRequired: true
       },
       {

           name: "Wl_Phone2",
           validator: "required",
           validMethod: "submit",
           isRequired: false
       },
       {

           name: "Wl_Phone3",
           validator: "required",
           validMethod: "submit",
           isRequired: false
       },
       {

           name: "Wl_Fax",
           validator: "required",
           validMethod: "submit",
           isRequired: false
       },
       {
           name: "Wl_Email",
           validator: "required",
           validMethod: "submit",
           isRequired: true
       },
       {
           name: "Wl_WebSite",
           validator: "required",
           validMethod: "submit",
           isRequired: false
       }
    ]
    $scope.addWL = function () {
        RegisterService.addWhiteLabel();
    }
})


