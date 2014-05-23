define([
    'backbone',
    'models/fiscalPeriod',
    'settings'
  ],

  function(Backbone, FiscalPeriod, Settings) {
    'use strict';

    return Backbone.Collection.extend({
      model: FiscalPeriod,
    });
  });
