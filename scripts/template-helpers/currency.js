define(['hbs/handlebars'], function ( Handlebars ) {
  'use strict';

  function currency ( context, options ) {
    if (options == null) {
      options = {};
    }

    options.currency = options.currency || ' €';
    return context.toFixed(2) + options.currency;
  }
  Handlebars.registerHelper( 'currency', currency );
  return currency;
});
