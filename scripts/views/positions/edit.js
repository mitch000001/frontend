define([
    'backbone',
    'i18n',
    'rv!templates/position-form',
    'ractive',
    'ractive-backbone'
  ],

  function( Backbone, I18n, PositionsTemplate, Ractive ) {
    'use strict';

    var attrWrapper = function( attr, obj ) {
      return {
        get: function() { return obj[attr] },
        set: function( value ) { debugger; obj[attr] = value }
      }
    };
    var accountLabel = function( obj ) { return attrWrapper('label', obj) };

    var putAccount = function putAccount( obj, code ) {
      var App = require( 'application' );
      obj.code = code;
      var account = App.accounts.findWhere({ code: obj.code });

      if (account === undefined) {
        account = App.accounts.create(obj);
      } else {
        account.set( obj );
        account.save();
      }
    }

    return function(position) {
      var originalAttributes = _.clone(position.attributes);
      var App = require('application');

      var accountFrom = {
        label: App.accounts.labelForCode( position.get('accountCodeFrom') )
      };
      var accountTo = {
        label: App.accounts.labelForCode( position.get('accountCodeTo') )
      };

      var ractive = new Ractive({
        template: PositionsTemplate  ,
        adapt: [ Ractive.adaptors.Backbone ],

        el: 'content',

        data: {
          position: position,
          year: position.get('fiscalPeriod').get('year'),
          t: I18n.t
        },

        computed: {
          accountLabelFrom: accountLabel(accountFrom),
          accountLabelTo: accountLabel(accountTo),

          totalAmount: {
            get: function() { return (this.get('position.totalAmountCents') / 100.0).toFixed(2); },
            set: function( value ) {
              this.set({
                'position.totalAmountCents': parseInt(value * 100)
              });
            }
          }
        }
      });

      ractive.on({
        save: function( event ) {
          var model = event.context.position;

          putAccount(accountFrom, model.get('accountCodeFrom'));
          putAccount(accountTo, model.get('accountCodeTo'));

          model.save().always(function() {
            this.fire('fiscalItem:put');
          }.bind(this));

          event.original.preventDefault();
        },
        teardown: function( event ) {
          if ( position.isNew() ) { // we probably used the navigation to close this view
            position.destroy();
          }
        },
        cancel: function( event ) {
          position.set( originalAttributes, { silence: true });
          this.fire( 'fiscalItem:cancel' )
        }
      });

      return ractive;
    };
  });
