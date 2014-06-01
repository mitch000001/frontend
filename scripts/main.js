require([
    'backbone',
    'application',
    'settings',
    'communicator',
    'collections/fiscalPeriods',
    'collections/accounts',
    'collections/backups',
    'views/navigation',
    'routers/fiscalPeriods',
    'routers/backups'
  ],

  function ( Backbone, App, Settings, Communicator, FiscalPeriods, Accounts, Backups, Navigation, FiscalPeriodsRouter, BackupsRouter ) {
    'use strict';

    var startApp = function startApp() {
      var fiscalPeriodPromise = App.fiscalPeriods.fetch();
      var accountsPromise = App.accounts.fetch();
      App.backups.fetch();

      Navigation(App.fiscalPeriods);

      $.when( fiscalPeriodPromise, accountsPromise ).done( function() {
        Communicator.mediator.trigger('APP:START');
        jQuery(document).foundation();
      });

      new FiscalPeriodsRouter();
      new BackupsRouter();

      Backbone.history.start();
    }


    App.addInitializer(function() {
      App.fiscalPeriods = new FiscalPeriods();
      App.accounts = new Accounts();
      App.backups = new Backups();

      var routeMapping = {
        'index.accounts': App.accounts,
        'index.fiscalPeriods': App.fiscalPeriods,
        'index.backups': App.backups
      };

      $.get(Settings.apiUrl('/'))
        .done(function(routes) {

          routes.forEach(function(route) {
            routeMapping[route.rel].url = route.href;
          });

          startApp();
        })
        .fail(function( error ) {
          alert('unable to load routes. fail');
        })
    });

    App.start();

  });
