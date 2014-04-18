define(['ractive', 'template-helpers/currency'], function( Ractive, Currency ) {
    var MyWidget = Ractive.extend({
      template: '<span>{{amount}}</span>',
      init: function () {
        this.set('amount',Currency(this.data.amount, { cents: 100 }));
      },
      data: {
        amount: '12,0 €'
      }
    });
    Ractive.components.currency = MyWidget;

  });