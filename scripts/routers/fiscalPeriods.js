define([
    'application',
    'backbone.marionette',
    'controllers/fiscalPeriods',
  ],

  function( App, Marionette, FiscalPeriodController) {
    'use strict';

    return Marionette.AppRouter.extend({

      controller: new FiscalPeriodController(),

      appRoutes: {
        '': 'dashboard',
        'years/:year': 'yearOverview',
        'years/:year/items/new': 'newYearPosition'
      },

    });
  });
