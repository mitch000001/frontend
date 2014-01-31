require([
    'backbone',
    'application',
    'routers/fiscalPeriods'
  ],

  function ( Backbone, App, FiscalPeriodsRouter ) {
    'use strict';

    App.addInitializer(function(options){
      new FiscalPeriodsRouter();
      Backbone.history.start();
    });

    App.start();

  });
