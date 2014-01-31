define([
    'application',
    'backbone.marionette'
  ],

  function( App, Marionette ) {
    'use strict';

    var FiscalPeriodController = function() {
      this.someMethod = function(year) {
        console.log(year);
      };
    };

    return Marionette.AppRouter.extend({

      controller: new FiscalPeriodController(),

      appRoutes: {
        'years/:year': 'someMethod'
      },

    });
  });
