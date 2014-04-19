define([
    'application',
    'backbone',
    'jquery',
    'models/position',
    'views/positions',
    'views/editPosition',
    'backbone.marionette',
  ],

  function( App, Backbone, $, Position, PositionsOverview, PositionForm ) {
    'use strict';

    return function() {
      this.showAccountOverview = function(year) {
        // TODO
      };

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

        return $.when(promise, App.accounts.fetch());
      };

      // TODO move this into a separate controller
      this.dashboard = function() {
        // App.content.close();
      };

      this.yearOverview = function( year ) {
        this.loadFiscalYear(year).done(function( fiscalYear ) {
          PositionsOverview(fiscalYear, fiscalYear.get('positions'))
        });
      };

      this.showYearPosition = function( year, id ) {
        this.loadFiscalYear(year).done(function( fiscalYear ) {
          var position = fiscalYear.get('positions').get(parseInt(id, 10));
          var view = PositionForm(position);
          view.on( 'fiscalItem:put', function() {
            Backbone.history.navigate('years/' + fiscalYear.get('year'), true);
          });
        });
      };

      this.newYearPosition = function( year ) {
        this.loadFiscalYear(year).done(function(fiscalYear) {
          var position = new Position({
              fiscalPeriod: fiscalYear,
              fiscalPeriodId: fiscalYear.get('id')
            });
          var view = PositionForm(position);

          view.on( 'fiscalItem:put', function() {
            fiscalYear.get('positions').add( view.model );
            Backbone.history.navigate('years/' + fiscalYear.get('year'), true);
          }.bind(this) );
        });
      };
    };

  });
