define([
    'backbone',
    'backbone.relational',
  ],

  function ( Backbone, BackboneRelational ) {
    'use strict';

    return BackboneRelational.extend({
      defaults: {
        category: 'Some Category',
        account: 5900,
        type: 'expense',
        invoiceDate: '2014-01-01',
        invoiceNumber: '20140101',
        totalAmount: 42.55,
        tax: 7
      }
    });
  });
