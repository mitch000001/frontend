define([
    'application',
    'backbone.marionette',
    'views/fiscalPeriodIndex',
    'views/fiscalPeriodPositionForm'
  ],

  function( App, Marionette, FiscalPeriodIndexView, PositionForm ) {
    'use strict';

    var FiscalPeriodController = function() {
      this.dashboard = function() {
        App.content.close();
      };

      this.yearsIndex = function( year ) {
        var view = new FiscalPeriodIndexView({
            year: year
          });

        App.content.show(view);
      };

      this.newYearPosition = function( year ) {
        var view = new PositionForm();
        App.content.show(view);
      };
    };

    return Marionette.AppRouter.extend({

      controller: new FiscalPeriodController(),

      appRoutes: {
        '': 'dashboard',
        'years/:year': 'yearsIndex',
        'years/:year/items/new': 'newYearPosition'
      },

    });
  });
