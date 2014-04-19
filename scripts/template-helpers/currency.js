define([], function ( ) {
  'use strict';

  function currency ( amount, options ) {
    if (options == null) {
      options = {};
    }

    options.currency = options.currency || ' €';
    amount = parseFloat(amount) || 0;

    if (options.cents != null) {
      amount /= options.cents;
    }
    return amount.toFixed(2) + options.currency;
  }

  return currency;
});
