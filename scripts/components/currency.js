define(
  ['ractive', 'template-helpers/currency'],
  function( Ractive, currencyHelper ) {
    'use strict';

    var CurrencyWidget = Ractive.extend({
        template: '<span>{{amount}}</span>',
        init: function () {
          this.set('amount',currencyHelper(this.data.amountCents, { cents: 100 }));
        },
        data: {
          amount: 'missing amount'
        }
      });
    Ractive.components.currency = CurrencyWidget;
  });