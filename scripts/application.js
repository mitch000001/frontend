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
      App.fiscalPeriods.fetch();

      var fiscalNavigation = new FiscalPeriodNavigation({ collection: fiscalPeriods });
      App.navigation.show(fiscalNavigation);

      App.accounts = new Accounts();
      App.accounts.fetch();

      Communicator.mediator.trigger('APP:START');
    });

    return App;
  });
