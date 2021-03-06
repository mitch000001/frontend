define([
    'backbone',
    'i18n',
    'rv!templates/positions/edit',
    'ractive',
    'helpers/computedPropertyWrapper',
    'ractive-backbone'
  ],

  function( Backbone, I18n, PositionsTemplate, Ractive, propertyWrapper ) {
    'use strict';

    var accountLabel = function( obj ) { return propertyWrapper('label', obj) };
    var uploadFile = function( fileList, prefix ) {
      // clear the filename of unwanted characters
      var clean = function(string) {
        return string.replace(/\s/, '_');
      }

      var promise = new $.Deferred();
      if (fileList !== null) {
        var file = fileList[0];
        $.ajax({
          url: '//' + window.location.host + '/upload/' + prefix + '/' + clean(file.name),
          method: 'POST',
          data: file,
          processData: false
        }).done( function(data) {
          var downloadPath = '/download/' + data.file.key;
          promise.resolve(downloadPath);
        }).fail( function() { promise.reject() });
      } else {
        promise.resolve();
      }
      return promise;
    }

    return function(position) {
      var originalAttributes = _.clone(position.attributes);
      var App = require('application');

      var accountFrom = {
        label: App.accounts.labelForCode( position.get('accountCodeFrom') )
      };
      var accountTo = {
        label: App.accounts.labelForCode( position.get('accountCodeTo') )
      };

      var ractive = new Ractive({
        template: PositionsTemplate,
        adapt: [ Ractive.adaptors.Backbone ],

        el: 'content',

        data: {
          position: position,
          year: position.get('fiscalPeriod').get('year'),
          t: I18n.t,
          convertedTotalAmountCents: 0
        },

        computed: {
          accountLabelFrom: accountLabel(accountFrom),
          accountLabelTo: accountLabel(accountTo),

          totalAmount: {
            get: function() { return (this.get('position.totalAmountCents') / 100.0).toFixed(2); },
            set: function( value ) {
              this.set({
                'position.totalAmountCents': parseInt(value * 100)
              });
            }
          }
        }
      });

      var refreshExchangeInfos = function() {
        var promise = new $.Deferred();
        $.get('/rates/' + position.get('invoiceDate') + '/' + position.get('currency'))
          .done(function(exchangeInfos) {
            ractive.set('exchangeRate', (1 / exchangeInfos.rate).toFixed(4));
            ractive.set('convertedTotalAmountCents', position.get('totalAmountCents') / exchangeInfos.rate)
          })
          .fail(function() {
            promise.fail();
          });
        return promise;
      }
      ractive.observe('position.invoiceDate', refreshExchangeInfos.bind(this));
      ractive.observe('position.currency', refreshExchangeInfos.bind(this));
      ractive.observe('position.totalAmountCents', refreshExchangeInfos.bind(this));

      ractive.on({
        save: function( event ) {
          var model = event.context.position;

          // TODO maybe handle account update errors?
          App.accounts.upsert(_.extend(accountFrom, { code: model.get('accountCodeFrom').toString() }));
          App.accounts.upsert(_.extend(accountTo, { code: model.get('accountCodeTo').toString() }));

          uploadFile( position.get('attachment'), position.get('fiscalPeriod').get('year') )
            .done( function(attachmentPath) {
              if (attachmentPath != null) {
                model.set('attachmentPath', attachmentPath);
              }
              model.save()
                .then(function() {
                  model.set({ errors: {}});
                  this.fire('fiscalItem:put');
                }.bind(this))
                .fail(function(response) {
                  position.set({ errors: response.responseJSON.errors });
                }.bind(this));
            }.bind(this)
          );

          event.original.preventDefault();
        },
        teardown: function( event ) {
          if ( position.isNew() ) { // we probably used the navigation to close this view
            position.destroy();
          }
        },
        cancel: function( event ) {
          position.set( originalAttributes, { silence: true });
          this.fire( 'fiscalItem:cancel' )
        }
      });

      return ractive;
    };
  });
