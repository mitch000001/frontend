define([
    'backbone',
    'hbs!tmpl/navigation/fiscalYearContainer',
    'hbs!tmpl/navigation/fiscalYear',
    'backbone.marionette'
  ],
  function( Backbone, FiscalPeriodNavigationTemplate, ItemViewTemplate ) {
    'use strict';

    var FiscalPeriodMenuItemView = Backbone.Marionette.ItemView.extend({
      template: ItemViewTemplate,
      tagName: 'li'
    });

    return Backbone.Marionette.CompositeView.extend({
        template: FiscalPeriodNavigationTemplate,

        itemViewContainer: 'ul.dropdown',
        itemView: FiscalPeriodMenuItemView,

        tagName: 'ul',
        className: 'left',

        onShow: function() {
          Foundation.libs.topbar.init();
        }
      });
  });
