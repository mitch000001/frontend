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
        return Settings.apiUrl('/fiscalPeriods/' + this.fiscalPeriod.get('year') + '/positions')
      }
    });
  });
