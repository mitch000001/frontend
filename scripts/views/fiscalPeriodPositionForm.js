define([
    'backbone.marionette',
    'hbs!tmpl/fiscalItems/form',
    'base64'
  ],
  function( Marionette, FiscalPeriodPositionViewTemplate, Base64 ) {
    'use strict';

    return Marionette.ItemView.extend({
        template: FiscalPeriodPositionViewTemplate,

        ui: {
          'form': '.fiscal-item',
          'cancel': 'a[data-cancel]',
          'attachment': ':input[type=file]'
        },

        events: {
          'submit @ui.form': 'updateModel',
          'click @ui.cancel': 'cancelModel',
          'change @ui.attachment': 'serializeAttachment'
        },

        serializeAttachment: function(evt) {
          var file = evt.currentTarget.files[0];
          var reader = new FileReader();

          reader.onload = function(e) {
            var encodedAsBase64 = Base64.encode( reader.result );
            this.model.set( 'encodedAttachment', encodedAsBase64, { silent: true } );
            this.model.set( 'encodedFileExtension', file.name.split('.').pop(), { silent: true } );
          }.bind(this);

          reader.readAsBinaryString(file);
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
