define(
  ['ractive','bloodhound', 'typeahead',],
  function( Ractive, Bloodhound ) {
    'use strict';

    var AccountPicker = Ractive.extend({
        template: '<input name="accountCode" type="text" placeholder="Identifikation" value="{{ account }}"/>',
        init: function () {
          var App = require('application');

          var datasource = new Bloodhound({
            datumTokenizer: function(d) {
              return _.map([d.code, d.label].concat(d.label.split(',')), $.trim);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: App.accounts.toJSON()
          });
          datasource.initialize();

          $('[name=accountCode]', this.$el).typeahead({highlight: true}, {
            displayKey: 'displayName',
            source: datasource.ttAdapter(),
            templates: {
              suggestion: function(item) {
                return item.displayName;
              }
            }
          });
        },
        data: {
          account: 'missing'
        }
      });
    Ractive.components['account-picker'] = AccountPicker;
  });