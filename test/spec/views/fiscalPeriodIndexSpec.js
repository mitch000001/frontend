define([
    'backbone',
    'views/fiscalPeriodIndex'
  ], function( Backbone, FiscalPeriodIndexView ) {
    'use strict';

    var positions = null;

    describe('#serializeData', function() {

      beforeEach(function() {
        positions = new Backbone.Collection();
      });

      it('adds a totalAmount', function() {
        positions.push(new Backbone.Model({ totalAmountCents: 101 }));
        positions.push(new Backbone.Model({ totalAmountCents: 19991 }));

        var view = new FiscalPeriodIndexView({ collection: positions });
        var data = view.serializeData();
        expect(data.totalAmount).toEqual( (19991 + 101) / 100.0 );
      });

    });

  });