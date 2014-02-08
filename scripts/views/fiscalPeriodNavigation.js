define([
    'backbone',
    'hbs!tmpl/navigation/fiscalYear',
    'backbone.marionette'
  ],
  function(Backbone, ItemViewTemplate) {
    'use strict';

    var FiscalPeriodMenuItemView = Backbone.Marionette.ItemView.extend({
      template: ItemViewTemplate
    });

    return Backbone.Marionette.CollectionView.extend({
        itemView: FiscalPeriodMenuItemView
      });
  });
