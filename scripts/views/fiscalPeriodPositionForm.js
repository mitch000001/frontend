define([
    'backbone.marionette',
    'hbs!tmpl/fiscalItems/form'
  ],
  function( Marionette, FiscalPeriodPositionViewTemplate ) {
    'use strict';

    return Marionette.ItemView.extend({
        template: FiscalPeriodPositionViewTemplate,

        ui: {
          'form': '.fiscal-item',
          'cancel': 'a[data-cancel]'
        },

        events: {
          'submit @ui.form': 'updateModel',
          'click @ui.cancel': 'cancelModel'
        },

        attributeTransformations: {
          'totalAmountCents': function(amount) { return Math.round(parseFloat(amount) * 100); },
          'tax': function(taxValue) { return parseInt(taxValue || 0, 10); }
        },

        modelEvents: {
          'change': 'render'
        },

        serializeData: function() {
          var data = Marionette.ItemView.prototype.serializeData.call(this);

          if (this.model != null) {
            data.totalAmount = data.totalAmountCents / 100.0;
          }

          return data;
        },

        setModelAttribute: function(attribute) {
          var value = attribute.value;
          if ( this.attributeTransformations[attribute.name] ) {
            value = this.attributeTransformations[attribute.name]( value );
          }
          this.model.set(attribute.name, value);
        },

        updateModel: function(evt) {
          evt.preventDefault();

          var data = this.ui.form.serializeArray();
          data.forEach(this.setModelAttribute, this);

          this.model.save().done(function() {
            this.trigger('fiscalItem:put')
          }.bind(this));
        },

        cancelModel: function(evt) {
          evt.preventDefault();

          if (this.model.isNew()) {
            this.model.destroy();
          }

          window.history.back();
        },

        templateHelpers: {
          isExpense: function(){
            return this.type === 'expense';
          },
          isIncome: function() {
            return this.type === 'income';
          },
          withoutTax: function() {
            return this.tax == 0;
          },
          reducedTax: function() {
            return this.tax === 7;
          },
          regularTax: function() {
            return this.tax === 19;
          }
        }
      });
  });
