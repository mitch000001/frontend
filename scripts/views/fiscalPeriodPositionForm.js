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

        triggers: {
          'submit @ui.form': {
            event: 'fiscalItem:put',
            preventDefault: true,
            stopPropagation: false
          }
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
