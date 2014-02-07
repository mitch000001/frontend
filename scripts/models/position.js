define([
    'backbone.relational',
    'settings'
  ],

  function ( Relational, Settings ) {
    'use strict';

    return Relational.extend({
      url: function() {
        if (this.isNew()) {
          return Settings.apiUrl('/fiscalPeriods/' + this.get('fiscalPeriod').get('year') + '/positions' );
        }
        return Settings.apiUrl('/fiscalPeriods/' + this.get('fiscalPeriod').get('year') + '/positions/' + this.get('id') );
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
      },

      totalAmount: function() {
        return parseFloat( this.get('totalAmount') );
      },

      toJSON: function() {
        var data = Relational.prototype.toJSON.apply(this);
        if ( data != null ) {
          delete data.fiscalPeriod;
        }
        return data;
      }
    });
  });
