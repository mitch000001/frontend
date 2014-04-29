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

      defaults: function() {
        var now = new Date();
        return {
          type: 'expense',
          invoiceDate: now.getFullYear() + '-' + (now.getMonth() < 10 ? '0' : '') + now.getMonth()  + '-' + (now.getDate() < 10 ? '0' : '') +now.getDate(),
          invoiceNumber: '',
          totalAmountCents: 0,
          currency: 'EUR',
          tax: 19,
          fiscalPeriodId: null,
          description: '',
          attachment: null,
          accountCodeFrom: '',
          accountCodeTo: '',
          errors: {}
        }
      },

      hasErrorOn: function(attr) {
        return attr in this.get('errors');
      },

      invoiceMonth: function() {
        return this.get('invoiceDate').split('-')[1];
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
