define(['hbs/handlebars'], function ( Handlebars ) {
  function currency ( context, options ) {
    options.currency = options.currency || " €";
    return context.toFixed(2) + options.currency;
  }
  Handlebars.registerHelper( 'currency', currency );
  return currency;
});
