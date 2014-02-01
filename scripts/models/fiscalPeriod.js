define([
    'backbone.relational',
    'collections/positions',
    'models/position'
  ],

  function ( Relational, PositionCollection, Position ) {
    'use strict';

    return Relational.extend({
      relations: [{
        type: Backbone.HasMany,
        key: 'positions',
        relatedModel: Position,
        collectionType: PositionCollection,
        reverseRelation: {
          key: 'fiscalPeriod'
        }
      }]
    });
  });
