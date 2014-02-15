define([
    'backbone',
    'models/account',
    'settings'
  ],

  function(Backbone, Account, Settings) {
    'use strict';

    return Backbone.Collection.extend({
      model: Account,
      url: Settings.apiUrl('/accounts')
    });
  });
