define([
    'backbone',
    'models/account',
    'views/fiscalPeriodPositionForm',
    'jasmine.ajax'
  ], function( Backbone, Account, FiscalPeriodPositionFormView ) {
    'use strict';

    var position = null;
    var view = null;

    describe('FiscalPeriodPositionFormView', function() {

      beforeEach(function() {
        position = new Account();
        view = new FiscalPeriodPositionFormView({ model: position });
      });

      describe('#updateModel', function() {

        beforeEach(function() {
          jasmine.Ajax.useMock();
        });

        it('creates new accounts if they are missing', function() {
          view.updateModel([{ name: 'accountCode', value: 'Hundefutter <1000>' }]);

          var request = mostRecentAjaxRequest();
          expect(request.url).toBe( '/api/accounts' );
        });

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