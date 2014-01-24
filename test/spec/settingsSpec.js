(function() {
  'use strict';

  define(['settings'], function( Settings ) {

    describe('Settings', function() {

      it('has a apiUrl method', function() {
        expect(Settings.apiUrl).toBeDefined();
      });

    });

  });

}).call( this );
