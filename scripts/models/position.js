define([
    'backbone',
    'settings',
    'backbone.relational',
    'backbone.mutators'
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

      mutators: {
        totalAmount: {
          set: function (key, value, options, set) {
            this.set('totalAmountCents', value * 100, options);
          },
          get: function () {
            return (this.get('totalAmountCents') / 100.0).toFixed(2);
          },
          transient: true
        }
      },

      constructor: function() {
        Backbone.RelationalModel.apply(this, arguments);
        this.set('totalAmount', this.get('totalAmount'));
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

      toJSON: function() {
        var data = Backbone.RelationalModel.prototype.toJSON.apply(this);
        if ( data != null ) {
          delete data.fiscalPeriod;
        }
        return data;
      }
    });
  });
