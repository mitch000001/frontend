define([
    'backbone',
    'views/fiscalPeriodNavigation'
  ], function ( Backbone, FiscalPeriodNavigation ) {
    'use strict';

    var view = null;
    var fiscalPeriods = null;
    var $el = null;

    describe( 'FiscalPeriodNavigation', function() {

      beforeEach( function() {
        fiscalPeriods = new Backbone.Collection();

        view = new FiscalPeriodNavigation({ collection: fiscalPeriods });
        $el = view.render().$el;
      });

      it('displays all fiscalPeriods', function() {

      });

    });
  });