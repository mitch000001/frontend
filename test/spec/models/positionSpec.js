define([
    'models/position',
    'models/fiscalPeriod'
  ], function( Position, FiscalPeriod ) {
    'use strict';

    var position = null;

    describe('Position', function() {

      beforeEach(function() {
        position = new Position();
      });

      it('is defined', function() {
        expect( Position ).toBeDefined();
      });

      describe('#toJSON', function() {

        var fiscalPeriod = null;
        beforeEach(function() {
          fiscalPeriod = new FiscalPeriod();
          position.set('fiscalPeriod', fiscalPeriod);
        });

        it('does not contain the fiscalPeriod data', function() {
          var data = position.toJSON();
          expect(data.fiscalPeriod).not.toBeDefined();
          expect(data.type).toBeDefined();
        });

      });

      describe('#totalAmount', function() {

        it('returns the totalAmount attribute as float', function() {
          position.set('totalAmountCents', 220);
          expect( position.totalAmount() ).toEqual( 2.2 );
        });

      });

    });

  });
