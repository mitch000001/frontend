define([
    'backbone',
    'i18n',
    'rv!templates/positions',
    'ractive',
    'ractive-backbone'
  ],

  function( Backbone, I18n, PositionsTemplate, Ractive ) {
    'use strict';

    return function(fiscalYear) {
      var ractive = new Ractive({
        template: PositionsTemplate  ,
        adapt: [ 'Backbone' ],

        el: 'content',

        data: {
          year: fiscalYear.get('year'),
          positions: fiscalYear.get('positions'),
          t: I18n.t
        },

        complete: function() {

        }
      });

      ractive.on( 'delete', function ( event ) {
        event.context.destroy();
      });

      return ractive;
    };
  });
