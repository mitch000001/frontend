define([
    'backbone',
    'i18n',
    'rv!templates/positions/index',
    'ractive',
    'ractive-backbone'
  ],

  function( Backbone, I18n, PositionsTemplate, Ractive ) {
    'use strict';

    return function(fiscalYear) {
      var MonthComponent = Ractive.extend({
        template: '{{ month }}',
        init: function() {
          if (this.data.month !== null) {
            this.set({ month: I18n.t('date.month_abbrs.' + parseInt(this.data.month, 10)) });
          }
        },
        lazy: true
      });

      var ractive = new Ractive({
        template: PositionsTemplate,
        adapt: [ 'Backbone' ],

        el: 'content',

        data: {
          fiscalYear: fiscalYear,
          positions: fiscalYear.get('positions'),
          t: I18n.t
        },

        components: {
          month: MonthComponent
        },

        computed: {
          totalAmount: {
            get: function() {
              var total = 0;
              this.get('positions').forEach(function(position) {
                total += position.signedTotalAmountCents();
              });
              return total;
            }
          },
          totalIncome: {
            get: function() {
              var total = 0;
              this.get('positions').filter(function(position) { return position.isIncome() }).forEach(function(position) {
                total += position.signedTotalAmountCents();
              });
              return total;
            }
          },
          totalExpense: {
            get: function() {
              var total = 0;
              this.get('positions').filter(function(position) { return !position.isIncome() }).forEach(function(position) {
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
