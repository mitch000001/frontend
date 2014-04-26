define([
    'application',
    'backbone',
    'jquery',
    'models/position',
    'views/positions/index',
    'views/positions/edit',
    'backbone.marionette',
  ],

  function( App, Backbone, $, Position, PositionsOverview, PositionForm ) {
    'use strict';

    var activeContent = null;

    return function() {
      this.showAccountOverview = function(year) {
        // TODO
      };

      this.loadFiscalYear = function( year ) {
        var promise = new $.Deferred();

        App.fiscalPeriods.fetch()
          .done(function() {
            var fiscalYear = App.fiscalPeriods.findWhere({
                year: parseInt( year, 10 )
              });

            fiscalYear.get( 'positions' ).fetch().done(function() {
              promise.resolve(fiscalYear);
            });
            if (activeContent != null) {
              activeContent.teardown();
            }
          })
          .fail(function() {
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
          fiscalYear.get('positions').sort();
          activeContent = PositionsOverview(fiscalYear)
        });
      };

      this.showYearPosition = function( year, id ) {
        this.loadFiscalYear(year).done(function( fiscalYear ) {
          var position = fiscalYear.get('positions').get(parseInt(id, 10));
          activeContent = PositionForm(position);

          activeContent.on( 'fiscalItem:put', function() {
            Backbone.history.navigate('years/' + fiscalYear.get('year'), true);
          });
          activeContent.on( 'fiscalItem:cancel', function() {
            Backbone.history.navigate('years/' + fiscalYear.get('year'), true);
          }.bind(this) )
        });
      };

      this.newYearPosition = function( year ) {
        this.loadFiscalYear(year).done(function(fiscalYear) {
          var position = new Position({
              fiscalPeriod: fiscalYear
            });
          activeContent = PositionForm(position);

          activeContent.on( 'fiscalItem:put', function() {
            fiscalYear.get('positions').add( position );
            Backbone.history.navigate('years/' + fiscalYear.get('year'), true);
          }.bind(this) );
          activeContent.on( 'fiscalItem:cancel', function() {
            Backbone.history.navigate('years/' + fiscalYear.get('year'), true);
          }.bind(this) )
        });
      };
    };

  });
