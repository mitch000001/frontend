define([
    'application',
    'models/position',
    'views/fiscalPeriodIndex',
    'views/fiscalPeriodPositionForm'
  ],

  function( App, Position, FiscalPeriodIndexView, PositionForm ) {
    'use strict';

    return function() {
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
        App.fiscalPeriodsPromise.done(function() {
          var fiscalYear = App.fiscalPeriods.findWhere({
            year: parseInt( year, 10 )
          });

          var view = new PositionForm({
            model: new Position()
          });

          view.on('fiscalItem:put', function( args ) {
            alert("I DID IT!");
          });
          App.content.show(view);
        });
        // App.fiscalPeriods.
        // .findWhere({ year: year })
      };
    };

  });
