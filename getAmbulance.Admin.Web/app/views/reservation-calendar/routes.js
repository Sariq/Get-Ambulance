
angular.module('sbAdminApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('dashboard.reservation-calendar', {
                url: '/reservation-calendar',
                templateUrl: 'views/reservation-calendar/views/reservation-calendar.html',
                controller: 'ReservationCalendarCtrl'
           });
});

