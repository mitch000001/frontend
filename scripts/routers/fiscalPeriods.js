define([
    'application',
    'backbone',
    'controllers/fiscalPeriods',
    'backbone.marionette'
  ],

  function( App, Backbone, FiscalPeriodController) {
    'use strict';

    return Backbone.Marionette.AppRouter.extend({

      controller: new FiscalPeriodController(),

      appRoutes: {
        '': 'dashboard',
        'years/:year': 'yearOverview',
        'years/:year/positions/new': 'newYearPosition',
        'years/:year/positions/:id': 'showYearPosition',
        'years/:year/accounts': 'showAccountOverview',
      },

    });
  });
