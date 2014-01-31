define([
    'backbone.marionette',
    'hbs!tmpl/fiscalPeriods/index',
    'hbs!tmpl/fiscalItems/_show'
  ],
  function( Marionette, FiscalPeriodOverviewViewTemplate, FiscalItemViewTemplate ) {
    'use strict';

    // var FiscalPeriodMenuItemView = Marionette.ItemView.extend({
    //   template: FiscalPeriodOverviewViewTemplate
    // });

    return Marionette.CompositeView.extend({
        template: FiscalPeriodOverviewViewTemplate,
        itemViewContainer: 'ul.items',
        itemView: FiscalItemViewTemplate,

        serializeData: function() {
          var data = Backbone.Marionette.ItemView.prototype.serializeData.apply(this, arguments);

          data.year = this.options.year;

          return data;
        }
      });
  });
