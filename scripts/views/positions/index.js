define([
    'backbone',
    'i18n',
    'rv!templates/positions/index',
    'ractive',
    'ractive-backbone'
  ],

  function( Backbone, I18n, PositionsTemplate, Ractive ) {
    'use strict';

    return function(fiscalYear) {
      var MonthComponent = Ractive.extend({
        template: '{{ month }}',
        init: function() {
          if (this.data.month !== null) {
            this.set({ month: I18n.t('date.month_abbrs.' + parseInt(this.data.month, 10)) });
          }
        },
        lazy: true,
        twoway: false
      });

      var ractive = new Ractive({
        template: PositionsTemplate,
        adapt: [ 'Backbone' ],

        el: 'content',

        data: {
          fiscalYear: fiscalYear,
          positions: fiscalYear.get('positions'),
          t: I18n.t,
          shortDate: function(content) {
            var parts = content.split('-');

            if (parts.length === 3) {
              return [parts[2], parts[1], ''].join('.');
            }
            return '';
          },
          filter: function( collection, query ) {
            if (query === undefined) {
              query = '';
            }
            if (query === '') {
              return collection;
            }
            var regexp = new RegExp( query );
            return collection.select(function(position) {
              return regexp.test(position.get('description')) || regexp.test(position.get('invoiceNumber'));
            });
          },
          vat: function( amountCents, tax ) {
            return amountCents - (amountCents / (tax / 100 + 1));
          },
          totalIncome: function( positions ) {
            var total = 0;
            positions.filter(function(position) { return position.isIncome() }).forEach(function(position) {
              total += position.signedTotalAmountCents();
            });
            return total;
          },
          totalExpense: function( positions ) {
            var total = 0;
            positions.filter(function(position) { return !position.isIncome() }).forEach(function(position) {
              total += position.signedTotalAmountCents();
            });
            return total;
          },
          totalAmount: function( positions ) {
            var total = 0;
            positions.forEach(function(position) {
              total += position.signedTotalAmountCents();
            });
            return total;
          },
          totalVatAmount: function( positions ) {
            var total = 0;
            positions.forEach(function(position) {
              total += position.totalVatAmountCents();
            });
            return total;
          },
          monthForPosition: function(positions, index) {
            var pos = positions.at(index);
            if (index === 0) {
              return pos.invoiceMonth();
            }
            var prev = positions.at(index - 1);
            if (prev.invoiceMonth() != pos.invoiceMonth()) {
              return pos.invoiceMonth();
            }
            return null;
          }
        },

        components: {
          month: MonthComponent
        }
      });

      ractive.on( 'delete', function ( event ) {
        event.context.destroy();
      });
      ractive.on( 'clearSearch', function( event ) {
        event.original.preventDefault();
        event.original.stopPropagation();
        this.set({ searchQuery: '' });
      });

      return ractive;
    };
  });
