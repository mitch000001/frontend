define([
    'application',
    'backbone',
    'controllers/backups',
    'backbone.marionette'
  ],

  function( App, Backbone, BackupsController) {
    'use strict';

    return Backbone.Marionette.AppRouter.extend({

      controller: new BackupsController(),

      appRoutes: {
        'backups': 'backupsOverview',
      },

    });
  });
