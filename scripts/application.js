define([
    'backbone',
    'communicator',
    'collections/fiscalPeriods',
    'collections/accounts',
    'views/fiscalPeriodNavigation',
    'backbone.marionette'
  ],

  function( Backbone, Communicator, FiscalPeriods, Accounts, FiscalPeriodNavigation ) {
    'use strict';

    var App = new Backbone.Marionette.Application();

    App.addRegions({
      navigation: '#navigation',
      content: '#content'
    });

    App.addInitializer( function () {
      var fiscalPeriods = new FiscalPeriods();
      App.fiscalPeriods = fiscalPeriods;
      var fiscalPeriodPromise = App.fiscalPeriods.fetch();

      App.accounts = new Accounts();
      var accountsPromise = App.accounts.fetch();

      var fiscalNavigation = new FiscalPeriodNavigation({ collection: fiscalPeriods });
      App.navigation.show(fiscalNavigation);

      $.when( fiscalPeriodPromise, accountsPromise ).done( function() {
        Communicator.mediator.trigger('APP:START');
      });
    });

    return App;
  });
