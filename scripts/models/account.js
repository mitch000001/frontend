define([
    'backbone'
  ],

  function ( Backbone ) {
    'use strict';

    return Backbone.Model.extend({

      toJSON: function() {
        var data = Backbone.Model.prototype.toJSON.apply(this);
        data.displayName = data.label + ' <' + data.code + '>';
        return data;
      }

    });
  });
