define([
    'backbone',
    'backbone.marionette',
    'hbs!tmpl/navigation/fiscalYear',
  ],
  function(Backbone, Marionette, ItemViewTemplate) {
    'use strict';

    var FiscalPeriodMenuItemView = Marionette.ItemView.extend({
      template: ItemViewTemplate
    });

    return Marionette.CollectionView.extend({
        itemView: FiscalPeriodMenuItemView
      });
  });
