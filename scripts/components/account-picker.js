define(
  ['ractive','bloodhound', 'typeahead'],
  function( Ractive, Bloodhound) {
    'use strict';

    var counter = 0;
    var setupAutocompletion = function setupAutocompletion() {
      var App = require('application');

      this.datasource = new Bloodhound({
        datumTokenizer: function(d) {
          return _.map([d.code, d.label].concat(d.label.split(',')), $.trim);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: function() {
          return App.accounts.toJSON();
        }
      });
      this.datasource.initialize();

      var selector = '[name=accountCode'+this.data.suffix+']';
      $(selector).typeahead({ highlight: true }, {
        displayKey: 'code',
        source: this.datasource.ttAdapter(),
        templates: {
          suggestion: function(item) {
            return item.displayName;
          }
        }
      }).on('typeahead:selected', function(evt, object) {
        this.set({ account: object.code, label: object.label });
      }.bind(this));
    };

    var AccountPicker = Ractive.extend({
        template: '<input name="accountLabel{{suffix}}" type="text" value="{{label}}">' +
          '<input name="accountCode{{suffix}}" type="text" placeholder="Identifikation" value="{{account}}"/>',
        complete: function () {
          setupAutocompletion.bind(this).call();
        },
        lazy: true,
        init: function () {
          counter += 1;
          this.set({ suffix: counter });
        },
        data: {
          account: 'missing',
          label: 'missing'
        }
      });

    Ractive.components['account-picker'] = AccountPicker;
  });