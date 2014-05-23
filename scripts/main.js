require([
    'backbone',
    'application',
    'settings',
    'communicator',
    'collections/fiscalPeriods',
    'collections/accounts',
    'views/navigation',
    'routers/fiscalPeriods'
  ],

  function ( Backbone, App, Settings, Communicator, FiscalPeriods, Accounts, Navigation, FiscalPeriodsRouter ) {
    'use strict';

    var startApp = function startApp() {
      var fiscalPeriodPromise = App.fiscalPeriods.fetch();
      var accountsPromise = App.accounts.fetch();

      Navigation(App.fiscalPeriods);

      $.when( fiscalPeriodPromise, accountsPromise ).done( function() {
        Communicator.mediator.trigger('APP:START');
        jQuery(document).foundation();
      });

      new FiscalPeriodsRouter();

      Backbone.history.start();
    }


    App.addInitializer(function() {
      App.fiscalPeriods = new FiscalPeriods();
      App.accounts = new Accounts();

      var routeMapping = {
        'index.accounts': App.accounts,
        'index.fiscalPeriods': App.fiscalPeriods
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
