define([
    'application',
    'settings',
    'collections/fiscalPeriods',
    'controllers/fiscalPeriods',
    'jasmine.ajax'
  ],

  function( App, Settings, FiscalPeriods, FiscalPeriodsController ) {
    'use strict';

    describe('FiscalPeriodsController', function() {
      beforeEach( function() {
        Settings.useFixtures = false;

        jasmine.Ajax.useMock();
        App.fiscalPeriods = new FiscalPeriods();
        App.accounts = new Backbone.Collection;
        App.accounts.fetch = function() { return []; };
      });

      describe('#loadFiscalYear', function() {

        it('requests the given fiscalYear', function() {
          var controller = new FiscalPeriodsController();
          controller.loadFiscalYear( 2014 );

          var request = mostRecentAjaxRequest();
          expect(request.url).toBe( '/api/fiscalPeriods' );
        });

      });

    });

  });
