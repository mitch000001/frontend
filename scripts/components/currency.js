define(['ractive', 'template-helpers/currency'], function( Ractive, Currency ) {
    var CurrencyWidget = Ractive.extend({
      template: '<span>{{amount}}</span>',
      init: function () {
        this.set('amount',Currency(this.data.amountCents, { cents: 100 }));
      },
      data: {
        amount: '12,0 €'
      }
    });
    Ractive.components.currency = CurrencyWidget;

  });