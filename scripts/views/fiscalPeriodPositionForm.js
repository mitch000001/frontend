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
          'totalAmount': parseFloat,
          'tax': function(taxValue) { return parseInt(taxValue || 0, 10); }
        },

        modelEvents: {
          'change': 'render'
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

          this.model.save();
          this.trigger('fiscalItem:put')
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
