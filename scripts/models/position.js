define([
    'backbone',
    'settings',
    'backbone.relational'
  ],

  function ( Backbone, Settings ) {
    'use strict';

    var Position = Backbone.RelationalModel.extend({
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
        currency: 'EUR',
        tax: 19,
        fiscalPeriodId: null,
        description: '',
        attachment: null,
        accountCodeFrom: '',
        accountCodeTo: ''
      },

      isIncome: function() {
        return this.get('type') == 'income';
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
          data.accountCodeFrom = data.accountCodeFrom.toString();
          data.accountCodeTo = data.accountCodeTo.toString();
          data.description = data.description.toString();
          data.invoiceNumber = data.invoiceNumber.toString();
          data.tax = parseInt( data.tax, 10 );
        }
        return data;
      }
    });
    return Position;
  });
