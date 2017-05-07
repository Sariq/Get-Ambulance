angular.module('sbAdminApp')
  .controller('ClientsListrCtrl', function ($scope, ClientsService, ngDialog, moment, calendarConfig, $ocLazyLoad, $window) {
      var vm = this;
      vm.prepareEvents = function () {
          vm.events = [];
          angular.forEach(vm.clientsList, function (value, key) {
             


              var Full_Name = value.Full_Name || "חסר שם";
              var reservationDateEnd = moment(value.CreatedDate).add(25, 'm');
              var temp_event = {
                  title: (Full_Name).toString(),
                  color: calendarConfig.colorTypes.info,
                  startsAt: value.CreatedDate,
                  endsAt: reservationDateEnd._d,
                  draggable: true,
                  resizable: true,
                  client: value
              };
              vm.events.push(temp_event);
          })
        
      }
      var getClientsList = function () {
          ClientsService.getClientsList().then(function (res) {

              vm.clientsList = res.data;
              vm.prepareEvents();
          }, function (err) {
              console.log(err);
          });
      }
      getClientsList();

      $scope.$on('update-reservations-list', function (event, args) {
          getReservations();
      });
      //These variables MUST be set as a minimum for the calendar to work
      vm.calendarView = 'month';
      vm.viewDate = new Date();
      var actions = [{
          label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
          onClick: function (args) {
              alert.show('Edited', args.calendarEvent);
          }
      }, {
          label: '<i class=\'glyphicon glyphicon-remove\'></i>',
          onClick: function (args) {
              alert.show('Deleted', args.calendarEvent);
          }
      }];

      calendarConfig.dateFormatter = 'moment'; // use moment instead of angular for formatting dates
      var originali18n = angular.copy(calendarConfig.i18nStrings);
      calendarConfig.i18nStrings.weekNumber = 'Semaine {week}';
      var originalFormat = calendarConfig.dateFormats.hour;
      calendarConfig.dateFormats.hour = 'HH:mm';
      $window.moment = $window.moment || moment;
      $ocLazyLoad.load('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/he.js').then(function () {
          moment.locale('fr', {
              week: {
                  dow: 1 // Monday is the first day of the week
              }
          });
          moment.locale('he'); // change the locale to french
      });

      $scope.$on('$destroy', function () {
          moment.locale('he');
          calendarConfig.i18nStrings = originali18n;
      });
      vm.events2 = [
        {
            title: 'An event',
            color: calendarConfig.colorTypes.warning,
            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
            color: calendarConfig.colorTypes.info,
            startsAt: moment().subtract(1, 'day').toDate(),
            endsAt: moment().add(5, 'days').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: 'This is a really long event title that occurs on every year',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            recursOn: 'year',
            draggable: true,
            resizable: true,
            actions: actions
        }
      ];

      vm.cellIsOpen = true;

      vm.addEvent = function () {
          vm.events.push({
              title: 'New event',
              startsAt: moment().startOf('day').toDate(),
              endsAt: moment().endOf('day').toDate(),
              color: calendarConfig.colorTypes.important,
              draggable: true,
              resizable: true
          });
      };

      vm.eventClicked = function (event) {
          if (event.reservation.Status!='1') {
          ReservationService.setSelectedReservationId(event.reservation._id);
          ReservationService.setSelectedReservation(event.reservation);
          ngDialog.open({
              template: 'views/reservation/item/reservation-item.html',
              className: 'ngdialog-theme-default',
              appendClassName: 'ngdialog-reservation-calendar',
              controller: 'ReservationItemCtrl',
              preCloseCallback: function (value) {
                  if (value && value != "$closeButton") {
                     // ctrl.updateReservationStatus(reservation, value);
                  }

              }
          });
      }
      };

      vm.eventEdited = function (event) {
          alert.show('Edited', event);
      };

      vm.eventDeleted = function (event) {
          alert.show('Deleted', event);
      };

      vm.eventTimesChanged = function (event) {
          alert.show('Dropped or resized', event);
      };

      vm.toggle = function ($event, field, event) {
          $event.preventDefault();
          $event.stopPropagation();
          event[field] = !event[field];
      };

      vm.timespanClicked = function (date, cell) {

          if (vm.calendarView === 'month') {
              if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                  vm.cellIsOpen = false;
              } else {
                  vm.cellIsOpen = true;
                  vm.viewDate = date;
              }
          } else if (vm.calendarView === 'year') {
              if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                  vm.cellIsOpen = false;
              } else {
                  vm.cellIsOpen = true;
                  vm.viewDate = date;
              }
          }

      };


  });
