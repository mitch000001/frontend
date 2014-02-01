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
          var fiscalYearPositions = fiscalYear.get('positions');

          fiscalYearPositions.on('all', function() { console.log(arguments) });
          var view = new FiscalPeriodIndexView({
              model: fiscalYear,
              collection: fiscalYearPositions
            });

          App.content.show(view);
        });
      };

      this.showYearPosition = function( year, id ) {
        loadFiscalYear(year).done(function( fiscalYear ) {
          var position = fiscalYear.get('positions').get(parseInt(id, 10));
          var view = new PositionForm({
            model: position
          });

          view.on('fiscalItem:put', function() {
            Backbone.history.navigate('years/' + fiscalYear.get('year'), true);
          }.bind(this));
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
