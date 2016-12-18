angular.module('starter.controllers')
.factory('ReservationHub',function ($rootScope, Hub, localStorageService, $timeout, ReservationService, authService, ngAuthSettings) {
    var Employees = this;
    var self = this;

    //Employee ViewModel
    var Client_ID = authService.getUserProfile()._id;

    self.getToken = function () {
       return localStorageService.get('authorizationData').token;
    }
    //Hub setup
    self.hub = new Hub('Reservation', {
        rootPath: ngAuthSettings.apiServiceBaseUri + 'signalr',
        listeners: {
            'newConnection': function (id) {
                Employees.connected.push(id);
                $rootScope.$apply();
                console.log('hub-newConnection');
            },
            'removeConnection': function (id) {
                Employees.connected.splice(Employees.connected.indexOf(id), 1);
                $rootScope.$apply();
            },
            'addReservation': function (reservation) {
                console.log("addReservation")
                alert("addReservation")
                $rootScope.$broadcast('update-reservations-list');
            },
            'reservationAccepted': function (reservationId) {
                console.log("reservationAccepted")
                alert("reservationAccepted - " + reservationId)
                $rootScope.$broadcast('update-reservations-list');
               // $rootScope.$broadcast('update-reservations-list');
            }
            
        },
        methods: ['lock', 'unlock'],
        errorHandler: function (error) {
            console.error(error);
        },
        queryParams: {
            'WL_ID': Client_ID
        },
        token: self.getToken(),
        autoConnect: false
    });
    $timeout(function () {
        self.hub.connect();
    }, 1000);
    $rootScope.$on('state-reloaded-after-refreshToken', function (event, args) {
        $timeout(function () {
            self.hub = new Hub('Reservation', {
                rootPath: ngAuthSettings.apiServiceBaseUri + 'signalr',
                listeners: {
                    'newConnection': function (id) {
                        Employees.connected.push(id);
                        $rootScope.$apply();
                        console.log('hub-newConnection');
                    },
                    'removeConnection': function (id) {
                        Employees.connected.splice(Employees.connected.indexOf(id), 1);
                        $rootScope.$apply();
                    },
                    'addReservation': function (reservation) {
                        alert("addReservation")
                        $rootScope.$broadcast('update-reservations-list');
                    }
                },
                methods: ['lock', 'unlock'],
                errorHandler: function (error) {
                    console.error(error);
                },
                queryParams: {
                    'WL_ID': Client_ID
                },
                token: self.getToken(),
                autoConnect: false
            });
            self.hub.connect();
        }, 1000);
    });

    //Web API setup
   // var webApi = OData('/odata/Employees', { id: '@Id' });

    //Helpers
    var find = function (id) {
        for (var i = 0; i < Employees.all.length; i++) {
            if (Employees.all[i].Id == id) return Employees.all[i];
        }
        return null;
    };

    //Variables
    Employees.all = [];
    Employees.connected = [];
    Employees.loading = true;

    //Methods
    Employees.add = function () {
        webApi.post({ Name: 'New', Email: 'New', Salary: 1 });
    }
    Employees.edit = function (employee) {
        employee.Edit = true;
        self.hub.lock(employee.Id);
    }
    Employees.delete = function (employee) {
        webApi.remove({ id: employee.Id });
    }
    Employees.patch = function (employee, key) {
        var payload = {};
        payload[key] = employee[key];
        webApi.patch({ id: employee.Id }, payload);
    }
    Employees.done = function (employee) {
        employee.Edit = false;
        self.hub.unlock(employee.Id);
    }

    //Load
    //Employees.all = webApi.query(function (data) {
    //    var employees = [];
    //    angular.forEach(data.value, function (employee) {
    //        employees.push(new Employee(employee));
    //    });
    //    Employees.all = employees;
    //    Employees.loading = false;
    //});
    return Employees;
})
