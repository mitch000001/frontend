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
      },
      comparator: 'invoiceDate',

      monthForPosition: function(index) {
        var pos = this.at(index);
        if (index === 0) {
          return pos.invoiceMonth();
        }
        var prev = this.at(index - 1);
        if (prev.invoiceMonth() != pos.invoiceMonth()) {
          return pos.invoiceMonth();
        }
        return null;
      }
    });
  });
