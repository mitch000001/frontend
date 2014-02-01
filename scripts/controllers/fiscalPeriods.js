define([
    'application',
    'backbone',
    'jquery',
    'models/position',
    'views/fiscalPeriodIndex',
    'views/fiscalPeriodPositionForm'
  ],

  function( App, Backbone, $, Position, FiscalPeriodIndexView, PositionForm ) {
    'use strict';

    /* load a single fiscalYear from the app fiscalPeriods */
    var loadFiscalYear = function ( year ) {
      var promise = new $.Deferred();

      App.fiscalPeriodsPromise.done(function() {
        var fiscalYear = App.fiscalPeriods.findWhere({
            year: parseInt( year, 10 )
          });
        fiscalYear.fetchRelated( 'positions' );
        promise.resolve(fiscalYear);
      });

      App.fiscalPeriodsPromise.fail(function() {
        promise.reject();
      })
      return promise;
    };

    return function() {
      this.dashboard = function() {
        App.content.close();
      };

      this.yearOverview = function( year ) {
        loadFiscalYear(year).done(function( fiscalYear ) {
          var view = new FiscalPeriodIndexView({
              model: fiscalYear,
              collection: fiscalYear.get('positions')
            });

          App.content.show(view);
        });
      };

      this.newYearPosition = function( year ) {
        loadFiscalYear(year).done(function(fiscalYear) {
          var view = new PositionForm({
            model: new Position({
              fiscalPeriod: fiscalYear,
              fiscalPeriodId: fiscalYear.get('id')
            })
          });

          view.on('fiscalItem:put', function() {
            fiscalYear.get('positions').add( view.model );
            Backbone.history.navigate('years/' + fiscalYear.get('year'), true);
          }.bind(this));
          App.content.show(view);
        });
      };
    };

  });
