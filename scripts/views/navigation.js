define([
    'backbone',
    'rv!templates/navigation',
    'ractive',
    'ractive-backbone',
    'jquery',
    'foundation.topbar'
  ],

  function( Backbone, NavigationTemplate, Ractive, _, jQuery ) {
    'use strict';

    return function(collection) {
      var navigation = new Ractive({
        template: NavigationTemplate,
        adapt: [ 'Backbone' ],

        el: 'navigation',

        data: {
          years: collection
        },

        complete: function() {
          jQuery(document).foundation();
        }
      });

      return navigation;
    };
  });
