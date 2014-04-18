define([
    'backbone',
    'communicator',
    'collections/fiscalPeriods',
    'collections/accounts',
    'backbone.marionette',
    'views/navigation'
  ],

  function( Backbone, Communicator, FiscalPeriods, Accounts, Marionette, Navigation ) {
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

      Navigation(fiscalPeriods);

      $.when( fiscalPeriodPromise, accountsPromise ).done( function() {
        Communicator.mediator.trigger('APP:START');
        jQuery(document).foundation();
      });
    });

    return App;
  });
