define([
    'backbone',
    'i18n',
    'rv!templates/position-form',
    'ractive',
    'ractive-backbone'
  ],

  function( Backbone, I18n, PositionsTemplate, Ractive ) {
    'use strict';

    return function(position) {
      var ractive = new Ractive({
        template: PositionsTemplate  ,
        adapt: [ Ractive.adaptors.Backbone ],

        el: 'content',

        data: {
          position: position,
          year: position.get('fiscalPeriod').get('year'),
          t: I18n.t
        }
      });

      ractive.on({
        save: function( event ) {
          var model = event.context.position;

          model.save().always(function() {
            this.fire('fiscalItem:put');
          }.bind(this));

          event.original.preventDefault();
        }
      });

      return ractive;
    };
  });
