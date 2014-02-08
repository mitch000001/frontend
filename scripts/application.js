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

      App.navigation.show(new FiscalPeriodNavigation({ collection: fiscalPeriods }));

      Communicator.mediator.trigger('APP:START');
    });

    return App;
  });
