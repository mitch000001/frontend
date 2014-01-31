define([
    'backbone',
    'models/position',
    'settings'
  ],

  function(Backbone, Position, Settings) {
    'use strict';

    return Backbone.Collection.extend({
      model: Position,
      url: Settings.apiUrl('/fiscalPeriods/:fiscalPeriodId/positions')
    });
  });
