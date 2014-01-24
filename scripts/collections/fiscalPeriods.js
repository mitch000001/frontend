define([
    'backbone',
    'models/fiscalPeriod'
  ],

  function(Backbone, FiscalPeriod) {
    'use strict';

    return Backbone.Collection.extend({
      model: FiscalPeriod
    });
  });