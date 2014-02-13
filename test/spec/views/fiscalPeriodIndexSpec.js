define([
    'backbone',
    'template-helpers/currency',
    'views/fiscalPeriodIndex'
  ], function( Backbone, Currency, FiscalPeriodIndexView ) {
    'use strict';

    var positions = null;
    var view = null;

    describe('FiscalPeriodIndexView', function() {

      beforeEach(function() {
        positions = new Backbone.Collection();
        view = new FiscalPeriodIndexView({ collection: positions });
      });

      describe('#serializeData', function() {

        it('adds a totalAmount', function() {
          positions.push(new Backbone.Model({ totalAmountCents: 101 }));
          positions.push(new Backbone.Model({ totalAmountCents: 19991 }));

          var data = view.serializeData();
          expect(data.totalAmount).toEqual( (19991 + 101) / 100.0 );
        });

      });

      describe('template', function() {

        it('renders the totalAmount', function() {
          var $el = view.render().$el;
          expect($el.html()).toContain(Currency(0));

          positions.push(new Backbone.Model({ totalAmountCents: 101 }));

          expect($el.html()).toContain(Currency(1.01));
        });

        it('contains a delete link for every position', function() {
          positions.push(new Backbone.Model({ totalAmountCents: 101 }));
          var $el = view.render().$el;

          expect($el.find('[data-method=delete]').length).toBe( 1 );

          positions.push(new Backbone.Model({ totalAmountCents: 101 }));
          expect($el.find('[data-method=delete]').length).toBe( 2 );
        });

      });

    });

  });