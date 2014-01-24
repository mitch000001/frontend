(function() {
  'use strict';

  define( ['settings'], function( Settings ) {

    describe('Settings', function() {

      describe('.apiUrl', function() {

        it('returns a fixture url if fixtures are enabled', function() {
          Settings.useFixtures = true;
          expect(Settings.apiUrl('/foo')).toEqual('/fixtures/foo.json');
        });

        it('returns an api url if fixtures are disabled', function() {
          Settings.useFixtures = false;
          expect(Settings.apiUrl('/foo')).toEqual('/api/foo');
        })

      });

    });

  });

}).call( this );
