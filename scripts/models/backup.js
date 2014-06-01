define([
    'backbone',
    'settings'
  ],

  function ( Backbone, Settings ) {
    'use strict';

    return Backbone.Model.extend({
      url: function() {
        return Settings.apiUrl('/backups' + (this.isNew() ? '' : '/' + this.get('id')));
      },

      restore: function() {
        //...
      }
    });
  });
