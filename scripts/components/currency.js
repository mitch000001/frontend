define(
  ['ractive', 'template-helpers/currency'],
  function( Ractive, currencyHelper ) {
    'use strict';

    var CurrencyWidget = Ractive.extend({
        template: '<span class="{{ type }}">{{ amount }}</span>',
        init: function () {
          if (this.data.amountCents != null) {
            this.set('amount',currencyHelper(this.data.amountCents, { cents: 100 }));
          } else {
            this.set('amount',currencyHelper(this.data.amount, { cents: 1 }));
          }
        },
        data: {
          amount: 'missing amount'
        }
      });
    Ractive.components.currency = CurrencyWidget;
  });