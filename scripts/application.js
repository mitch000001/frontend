define([
    'backbone',
    'communicator',
    'collections/fiscalPeriods',
    'views/fiscalPeriodNavigation',
    'backbone.marionette'
  ],

  function( Backbone, Communicator, FiscalPeriods, FiscalPeriodNavigation ) {
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

      Communicator.mediator.trigger('APP:START');
    });

    return App;
  });
