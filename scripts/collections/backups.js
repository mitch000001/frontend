define([
    'backbone',
    'models/backup',
    'settings'
  ],

  function(Backbone, Backup, Settings) {
    'use strict';

    return Backbone.Collection.extend({
      model: Backup,
    });
  });
