define([
    'backbone',
    'i18n',
    'template-helpers/currency',
    'rv!templates/positions',
    'ractive',
    'ractive-backbone'
  ],

  function( Backbone, I18n, Currency, PositionsTemplate, Ractive ) {
    'use strict';

    return function(fiscalYear) {
      var ractive = new Ractive({
        template: PositionsTemplate  ,
        adapt: [ 'Backbone' ],

        el: 'content',

        data: {
          year: fiscalYear.get('year'),
          positions: fiscalYear.get('positions'),
          t: I18n.t,
          currency: Currency
        },

        complete: function() {

        }
      });

      return ractive;
    };
  });
