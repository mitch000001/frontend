define([
    'backbone'
  ],

  function ( Backbone ) {
    'use strict';

    return Backbone.Model.extend({

      displayName: function() {
        return this.get('label') + ' <' + this.get('code') + '>';
      },

      toJSON: function() {
        var data = Backbone.Model.prototype.toJSON.apply(this);
        data.displayName = this.displayName();
        return data;
      }

    });
  });
