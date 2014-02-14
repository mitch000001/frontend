define([
    'backbone',
    'views/fiscalPeriodPositionForm'
  ], function( Backbone, FiscalPeriodPositionFormView ) {
    'use strict';

    var position = null;
    var view = null;

    describe('FiscalPeriodPositionFormView', function() {

      beforeEach(function() {
        position = new Backbone.Model({});
        view = new FiscalPeriodPositionFormView({ model: position });
      });

      describe('#serializeData', function() {

        it('contains totalAmount', function() {
          position.set('totalAmountCents', 1999);
          var data = view.serializeData();
          expect(data.totalAmount).toEqual( 19.99 );
        });

      });

    });
  });