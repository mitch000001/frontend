define(['accounting'], function ( accounting ) {
  'use strict';

  var symbols = {
    'EUR': '€',
    'USD': '$'
  };

  function currency ( amount, options ) {
    if (options == null) {
      options = {};
    }
    amount = parseFloat(amount) || 0;
    options.currency = options.currency || 'EUR';

    if (options.cents != null) {
      amount /= options.cents;
    }

    return accounting.formatMoney(amount, {
      symbol: symbols[options.currency],
      format: "%v %s",
      thousand: '.',
      decimal: ','
    });
  }

  return currency;
});
