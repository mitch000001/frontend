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
        expect($el.find('[data-method=show]').length).toBe( 0 );

        fiscalPeriods.push(new Backbone.Model({ year: 2013 }));

        expect($el.find('[data-method=show]').length).toBe( 1 );
        expect($el.html()).toContain( 2013 );
      });

    });
  });