define([
    'application',
    'backbone.marionette',
    'views/fiscalPeriodIndex'
  ],

  function( App, Marionette, FiscalPeriodIndexView ) {
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
    };

    return Marionette.AppRouter.extend({

      controller: new FiscalPeriodController(),

      appRoutes: {
        '': 'dashboard',
        'years/:year': 'yearsIndex'
      },

    });
  });
