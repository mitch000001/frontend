define([
    'backbone.marionette',
    'hbs!tmpl/fiscalPeriods/index',
    'hbs!tmpl/fiscalItems/_show'
  ],
  function( Marionette, FiscalPeriodOverviewViewTemplate, FiscalItemViewTemplate ) {
    'use strict';

    var FiscalPeriodPositionItemView = Marionette.ItemView.extend({
      template: FiscalItemViewTemplate
    });

    return Marionette.CompositeView.extend({
        template: FiscalPeriodOverviewViewTemplate,
        itemViewContainer: 'ul.items',
        itemView: FiscalPeriodPositionItemView,
      });
  });
