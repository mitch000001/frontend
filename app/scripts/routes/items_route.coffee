Frontend.ItemsRoute = Ember.Route.extend
  model: ->
    Frontend.Item.find()
