define([
    'backbone',
    'i18n',
    'rv!templates/position-form',
    'ractive',
    'ractive-backbone'
  ],

  function( Backbone, I18n, PositionsTemplate, Ractive ) {
    'use strict';

    return function(position) {
      var ractive = new Ractive({
        template: PositionsTemplate  ,
        adapt: [ 'Backbone' ],

        el: 'content',

        data: {
          position: position,
          year: position.get('fiscalPeriod').get('year'),
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
