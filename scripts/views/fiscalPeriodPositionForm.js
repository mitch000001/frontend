define([
    'backbone.marionette',
    'hbs!tmpl/fiscalItems/_form'
  ],
  function( Marionette, FiscalPeriodPositionViewTemplate ) {
    'use strict';

    return Marionette.ItemView.extend({
        template: FiscalPeriodPositionViewTemplate
      });
  });
