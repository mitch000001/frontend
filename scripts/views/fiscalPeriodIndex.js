define([
    'backbone',
    'hbs!tmpl/fiscalPeriods/index',
    'hbs!tmpl/fiscalItems/show',
    'backbone.marionette'
  ],
  function( Backbone, FiscalPeriodOverviewViewTemplate, FiscalItemViewTemplate ) {
    'use strict';

    var FiscalPeriodPositionItemView = Backbone.Marionette.ItemView.extend({
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
        var data = Backbone.Marionette.ItemView.prototype.serializeData.call(this);

        if (this.model != null) {
          data.fiscalPeriod = this.model.get('fiscalPeriod').toJSON();
          data.totalAmount = data.totalAmountCents / 100.0;
        }
        return data;
      }
    });

    return Backbone.Marionette.CompositeView.extend({
        template: FiscalPeriodOverviewViewTemplate,

        itemViewContainer: 'table.items > tbody',
        itemView: FiscalPeriodPositionItemView,

        collectionEvents: {
          'change': 'render',
          'destroy': 'render'
        },

        serializeData: function() {
          var data = Backbone.Marionette.CompositeView.prototype.serializeData.call(this);

          var total = 0.0;
          this.collection.forEach(function(position) {
            total += position.get('totalAmountCents');
          });
          data.totalAmount = total / 100.0;

          return data;
        }
      });
  });
