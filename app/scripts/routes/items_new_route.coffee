Frontend.ItemsNewRoute = Ember.Route.extend
  model: ->
    Frontend.Store.createRecord('item')
