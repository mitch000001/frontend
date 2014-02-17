define([
    'models/account'
  ], function( Account ) {
    'use strict';

    var account = null;

    describe('Account', function() {

      beforeEach(function() {
        account = new Account({
          label: 'Sample',
          code: '200'
        });
      });

      describe('#toJSON', function() {

        it('contains a displayName', function() {
          var data = account.toJSON();
          expect(data.displayName).toEqual('Sample <200>');
        });

      });

    });

  });
