define([
    'backbone',
    'backbone.relational',
    'settings'
  ],

  function ( Backbone, BackboneRelational, Settings ) {
    'use strict';

    return BackboneRelational.extend({
      url: function() {
        if (this.isNew()) {
          return Settings.apiUrl('/fiscalPeriods/' + this.get('fiscalPeriod').get('id') + '/positions' );
        }
        return Settings.apiUrl('/fiscalPeriods/' + this.get('fiscalPeriod').get('id') + '/positions/' + this.get('id') );
      },
      defaults: {
        category: 'Some Category',
        account: "5900",
        type: 'expense',
        invoiceDate: '2014-01-01',
        invoiceNumber: '20140101',
        totalAmount: 42.55,
        tax: 7,
        fiscalPeriodId: null
      }
    });
  });
