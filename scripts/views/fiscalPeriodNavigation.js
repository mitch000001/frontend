define([
    'backbone',
    'hbs!tmpl/navigation/fiscalYearContainer',
    'hbs!tmpl/navigation/fiscalYearItem',
    'jquery',
    'foundation.topbar',
    'backbone.marionette'
  ],
  function( Backbone, FiscalPeriodNavigationTemplate, ItemViewTemplate, jQuery, Foundation ) {
    'use strict';

    var FiscalPeriodMenuItemView = Backbone.Marionette.ItemView.extend({
      template: ItemViewTemplate,
      tagName: 'li',
      className: 'has-dropdown not-click'
    });

    return Backbone.Marionette.CompositeView.extend({
        template: FiscalPeriodNavigationTemplate,

        itemViewContainer: 'ul.dropdown',
        itemView: FiscalPeriodMenuItemView,

        tagName: 'ul',
        className: 'left',

        onShow: function() {
          jQuery(document).foundation();
        }
      });
  });
