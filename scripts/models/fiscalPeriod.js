define([
    'backbone',
    'collections/positions',
    'models/position'
  ],

  function ( Backbone, PositionCollection, Position ) {
    'use strict';

    return Backbone.RelationalModel.extend({
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
