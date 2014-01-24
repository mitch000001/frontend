define([
    'backbone',
  ],

  function ( Backbone ) {
    'use strict';

    return Backbone.Model.extend({
      sayHello: function() {
          window.alert('Hello');
        }
    });
  });
