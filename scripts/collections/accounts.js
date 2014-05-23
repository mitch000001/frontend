define([
    'backbone',
    'models/account',
    'settings'
  ],

  function(Backbone, Account, Settings) {
    'use strict';

    return Backbone.Collection.extend({
      model: Account,

      labelForCode: function( code ) {
        var account;
        if ( account = this.findWhere({ code: code }) ) {
          return account.get('label');
        }
        return '';
      },

      /**
       * creates or updates an account, identified by its code.
       */
      upsert: function( attrs ) {
        var account;

        if ( account = this.findWhere({ code: attrs.code }) ) {
          account.set( attrs );
          return account.save();
        } else {
          return this.create( attrs );
        }
      }
    });
  });
