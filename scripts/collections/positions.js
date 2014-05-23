define([
    'backbone',
    'models/position',
    'settings'
  ],

  function(Backbone, Position, Settings) {
    'use strict';

    return Backbone.Collection.extend({
      model: Position,
      url: function() {
        return this.fiscalPeriod.get('positions_url');
      },
      comparator: 'invoiceDate'
    });
  });
