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
      },

      ui: {
        'delete': '[data-method="delete"]'
      },

      events: {
        'click @ui.delete': 'deletePosition'
      },

      deletePosition: function(evt) {
        evt.preventDefault();

        this.model.destroy();
      },

      serializeData: function() {
        var data = Marionette.ItemView.prototype.serializeData.call(this);

        if (this.model != null) {
          data.fiscalPeriod = this.model.get('fiscalPeriod').toJSON();
        }
        return data;
      }
    });

    return Marionette.CompositeView.extend({
        template: FiscalPeriodOverviewViewTemplate,

        itemViewContainer: 'table.items > tbody',
        itemView: FiscalPeriodPositionItemView,

        collectionEvents: {
          'change': 'render',
          'destroy': 'render'
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
