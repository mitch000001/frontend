define([
    'backbone',
    'backbone.relational',
    'collections/positions',
    'models/position'
  ],

  function ( Backbone, BackboneRelational, PositionCollection, Position ) {
    'use strict';

    return BackboneRelational.extend({
      relations: [{
        type: Backbone.HasMany,
        key: 'positions',
        relatedModel: Position,
        collectionType: PositionCollection
      }]
    });
  });
