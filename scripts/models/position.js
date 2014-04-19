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
        type: 'expense',
        invoiceDate: '2014-01-01',
        invoiceNumber: '20140101',
        totalAmountCents: 0,
        tax: 7,
        fiscalPeriodId: null,
        description: ''
      },

      signedTotalAmountCents: function() {
        if (this.get('type') === 'expense') {
          return this.get('totalAmountCents') * -1;
        }
        return this.get('totalAmountCents');
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
