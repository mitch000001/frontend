define([
    'backbone',
    'models/account',
    'settings'
  ],

  function(Backbone, Account, Settings) {
    'use strict';

    return Backbone.Collection.extend({
      model: Account,
      url: Settings.apiUrl('/accounts'),

      labelForCode: function( code ) {
        var account;
        if ( account = this.findWhere({ code: code }) ) {
          return account.get('label');
        }
        return '';
      },
    });
  });
