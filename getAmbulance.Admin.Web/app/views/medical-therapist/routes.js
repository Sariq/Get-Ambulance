
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
           .state('dashboard.medical-therapist-reservation-list', {
               url: '/medical-therapist-reservation-list',
               templateUrl: 'views/medical-therapist/reservation/list/medical-therapist-reservation-list.html',
               controller: 'MedicalTherapistReservationListCtrl'
           }).state('dashboard.medical-therapist-prices', {
               url: '/medical-therapist-prices',
               templateUrl: 'views/medical-therapist/prices/medical-therapist-prices.html',
               controller: 'MedicalTherapistPricesCtrl'
           });
});

