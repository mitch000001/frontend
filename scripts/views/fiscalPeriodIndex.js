define([
    'backbone.marionette',
    'hbs!tmpl/fiscalPeriods/index',
    'hbs!tmpl/fiscalItems/show'
  ],
  function( Marionette, FiscalPeriodOverviewViewTemplate, FiscalItemViewTemplate ) {
    'use strict';

    var FiscalPeriodPositionItemView = Marionette.ItemView.extend({
      tagName: 'tr',
      template: FiscalItemViewTemplate,
      modelEvents: {
        'change': 'render',
      }
    });

    return Marionette.CompositeView.extend({
        template: FiscalPeriodOverviewViewTemplate,

        itemViewContainer: 'table.items > tbody',
        itemView: FiscalPeriodPositionItemView,

        collectionEvents: {
          'change': 'render'
        },

        serializeData: function() {
          var data = Marionette.CompositeView.prototype.serializeData.call(this);

          data.total = 0.0;
          this.collection.forEach(function(position) {
            data.total += position.totalAmount();
          });

          return data;
        }
      });
  });
