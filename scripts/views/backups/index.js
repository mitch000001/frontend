define([
    'backbone',
    'i18n',
    'rv!templates/backups/index',
    'ractive',
    'ractive-backbone'
  ],

  function( Backbone, I18n, BackupsTemplate, Ractive ) {
    'use strict';

    return function(backups) {
      var ractive = new Ractive({
        template: BackupsTemplate,
        adapt: [ 'Backbone' ],

        el: 'content',

        data: {
          backups: backups,
          t: I18n.t
        }
      });

      ractive.on( 'delete', function ( event ) {
        event.context.destroy();
      });

      return ractive;
    };
  });
