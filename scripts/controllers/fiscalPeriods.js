define([
    'application',
    'backbone',
    'jquery',
    'models/position',
    'views/fiscalPeriodIndex',
    'views/fiscalPeriodPositionForm',
    'backbone.marionette'
  ],

  function( App, Backbone, $, Position, FiscalPeriodIndexView, PositionForm ) {
    'use strict';

    return function() {
      this.loadFiscalYear = function( year ) {
        var promise = new $.Deferred();

        App.fiscalPeriods.fetch().done(function() {
          var fiscalYear = App.fiscalPeriods.findWhere({
              year: parseInt( year, 10 )
            });
          fiscalYear.fetchRelated( 'positions' );
          promise.resolve(fiscalYear);
        });

        App.fiscalPeriods.fetch().fail(function() {
          promise.reject();
        })
        return promise;
      };

      // TODO move this into a separate controller
      this.dashboard = function() {
        App.content.close();
      };

      this.yearOverview = function( year ) {
        this.loadFiscalYear(year).done(function( fiscalYear ) {
          var fiscalYearPositions = fiscalYear.get('positions');

          var view = new FiscalPeriodIndexView({
              model: fiscalYear,
              collection: fiscalYearPositions
            });

          App.content.show(view);
        });
      };

      this.showYearPosition = function( year, id ) {
        this.loadFiscalYear(year).done(function( fiscalYear ) {
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
        this.loadFiscalYear(year).done(function(fiscalYear) {
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
