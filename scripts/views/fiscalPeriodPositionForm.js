define([
    'backbone.marionette',
    'hbs!tmpl/fiscalItems/_form'
  ],
  function( Marionette, FiscalPeriodPositionViewTemplate ) {
    'use strict';

    return Marionette.ItemView.extend({
        template: FiscalPeriodPositionViewTemplate,

        ui: {
          'form': '.fiscal-item'
        },

        events: {
          'submit @ui.form': 'updateModel'
        },

        setModelAttribute: function(attribute) {
          this.model.set(attribute.name, attribute.value);
        },

        updateModel: function(evt) {
          evt.preventDefault();

          var data = this.ui.form.serializeArray();
          data.forEach(this.setModelAttribute, this);

          this.model.save();
          this.trigger('fiscalItem:put')
        },

        templateHelpers: {
          isExpense: function(){
            return this.type === 'expense';
          },
          isIncome: function() {
            return this.type === 'income';
          },
          withoutTax: function() {
            return this.tax == null;
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
