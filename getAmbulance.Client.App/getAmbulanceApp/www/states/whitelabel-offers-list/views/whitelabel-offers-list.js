

angular.module('starter.controllers').controller('WhiteLabelOffersListCtrl', function ($ionicPlatform,$ionicPopup, $scope, $ionicModal, ReservationService, localStorageService, MapService, CommonService) {




    $scope.$on('$destroy', function () {
        CommonService.deregisterHardBack();
    });
    $scope.headerInfoText = 'Header_Info_Common_Text';
    $scope.reservationForm = localStorageService.get('reservationFormData');
    $scope.noProviderFound = false;
    $scope.setNoProviderFound = function (data) {
        if (data.length>0) {
            $scope.noProviderFound = false;
        } else {
            $scope.noProviderFound = true;
        }
    }

    $scope.getAmbulanceOffersList = function () {
        CommonService.showLoader();
        var addressNameList = [$scope.reservationForm.From_Address, $scope.reservationForm.To_Address];
        MapService.getLatLangByAddress(addressNameList).then(function (result) {
            CommonService.hideLoader();
            var addressLatLngList = result;
    
            ReservationService.getAmbulanceOffersList($scope.reservationForm, addressLatLngList).then(function (res) {
                $scope.providerPriceOffersList = res.data;
                $scope.setNoProviderFound($scope.providerPriceOffersList);
            localStorageService.set('ambulancePriceOffersList', $scope.providerPriceOffersList);
        });
        })
    }

    $scope.getMedicalTherapistOffersList = function () {
        CommonService.showLoader();
        var addressNameList = [$scope.reservationForm.Meeting_Address];
        MapService.getLatLangByAddress(addressNameList).then(function (result) {
            CommonService.hideLoader();
            var addressLatLngList = result;

            ReservationService.getMedicalTherapistOffersList($scope.reservationForm,addressLatLngList).then(function (res) {
                $scope.providerPriceOffersList = res.data;
                $scope.setNoProviderFound($scope.providerPriceOffersList);

            localStorageService.set('medicalTherapistOffersList', $scope.providerPriceOffersList);
        });
        })
    }

    $scope.getStairsAssistanceOffersList = function () {
        CommonService.showLoader();
        var addressNameList = [$scope.reservationForm.Meeting_Address];
        MapService.getLatLangByAddress(addressNameList).then(function (result) {
            CommonService.hideLoader();
            var addressLatLngList = result;

            ReservationService.getStairsAssistanceOffersList($scope.reservationForm, addressLatLngList).then(function (res) {
                $scope.providerPriceOffersList = res.data;
                $scope.setNoProviderFound($scope.providerPriceOffersList);

                localStorageService.set('stairsAssistanceOffersList', $scope.providerPriceOffersList);
            });
        })
        
    }

    $scope.getOfferList = function () {
        $scope.reservationType=localStorageService.get('reservationType');

        switch ($scope.reservationType) {
            case '1':
                $scope.getAmbulanceOffersList();
                break;
            case '2':
                $scope.getMedicalTherapistOffersList();
                break;
            case '3':
                $scope.getStairsAssistanceOffersList();
                break;
        }

    }
    $scope.getOfferList();

    $scope.showOnlySelectedOffer = function (whiteLabelOffer) {
        angular.forEach($scope.providerPriceOffersList, function (value, key) {
            if (value.whiteLabelid != whiteLabelOffer.whiteLabelid) {
                value.active = false;
            }
        })
    }
    $scope.showTyp=false;
    $scope.isSelected = false;
    $scope.setSelectedOffer = function (whiteLabelOffer) {
        
        $scope.whiteLabelOffer = whiteLabelOffer;
        $scope.myPopup = $ionicPopup.show({
            templateUrl: 'popUp/confirm-sending-reservation/confirm-sending-reservation.html',
            scope: $scope

        })
       
    }
    
    
    $scope.data = {};
    $scope.approveReservation = function (whiteLabelOffer) {
        CommonService.showLoader();
        $scope.isSelected = true;
        $scope.myPopup.close();
        $scope.showOnlySelectedOffer(whiteLabelOffer);
        ReservationService.setWhiteLabelOffer(whiteLabelOffer);
        ReservationService.sendReservationData().then(function (res) {
            
            $scope.Reservation = res.data;
            CommonService.hideLoader();
            $scope.showTyp = true;
        });
    }
    // An elaborate, custom popup
    $scope.$on('update-whiteLabel-data', function (event, args) {
        $scope.getOfferList();
    });

    
  
})


