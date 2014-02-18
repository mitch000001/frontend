define([
    'backbone',
    'settings',
    'backbone.relational'
  ],

  function ( Backbone, Settings ) {
    'use strict';

    return Backbone.RelationalModel.extend({
      url: function() {
        if (this.isNew()) {
          return Settings.apiUrl('/fiscalPeriods/' + this.get('fiscalPeriod').get('year') + '/positions' );
        }
        return Settings.apiUrl('/fiscalPeriods/' + this.get('fiscalPeriod').get('year') + '/positions/' + this.get('id') );
      },

      defaults: {
        category: 'Some Category',
        type: 'expense',
        invoiceDate: '2014-01-01',
        invoiceNumber: '20140101',
        totalAmountCents: 0,
        tax: 7,
        fiscalPeriodId: null
      },

      totalAmount: function() {
        return parseFloat( this.get('totalAmountCents') ) / 100.0;
      },

      toJSON: function() {
        var data = Backbone.RelationalModel.prototype.toJSON.apply(this);
        if ( data != null ) {
          delete data.fiscalPeriod;
        }
        return data;
      }
    });
  });
