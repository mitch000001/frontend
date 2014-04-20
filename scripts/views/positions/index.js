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
          fiscalYear: fiscalYear,
          t: I18n.t
        },

        twoway: false,

        complete: function() {

        },

        computed: {
          totalAmount: {
            get: function() {
              var total = 0;
              this.get('fiscalYear.positions').forEach(function(position) {
                total += position.signedTotalAmountCents();
              });
              return total;
            }
          }
        }
      });

      ractive.on( 'delete', function ( event ) {
        event.context.destroy();
      });

      return ractive;
    };
  });
