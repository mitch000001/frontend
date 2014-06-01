define([
    'application',
    'backbone',
    'jquery',
    'views/backups/index',
    'backbone.marionette',
  ],

  function( App, Backbone, $, BackupsOverview, PositionForm ) {
    'use strict';

    var activeContent = null;

    return function() {
      this.backupsOverview = function() {
        BackupsOverview(App.backups);
      };
    }
  }
);