define( ['models/position'], function( Position ) {
  'use strict';

  var position = null;

  describe('Position', function() {

    beforeEach(function() {
      position = new Position();
    });

    it('is defined', function() {
      expect( Position ).toBeDefined();
    });

    describe('#totalAmount', function() {

      it('returns the totalAmount attribute as float', function() {
        position.set('totalAmount', '2.2');
        expect( position.totalAmount() ).toEqual( 2.2 );
      });

    });

  });

});
