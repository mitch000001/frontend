define( ['template-helpers/currency'], function( CurrencyHelper ) {
  'use strict';

  describe('CurrencyHelper', function() {

    it('converts the amount to %.2f format', function() {
      expect( CurrencyHelper(2.5) ).toBe( '2.50 €' );
      expect( CurrencyHelper(-75.5) ).toBe( '-75.50 €' );
      expect( CurrencyHelper(19.745) ).toBe( '19.75 €' );
    });

  });

});
