Frontend.ItemsNewRoute = Ember.Route.extend({
  model: -> {}
})

Frontend.ItemsIndexRoute = Ember.Route.extend({
  setupController: (controller) ->
    controller.set 'items', @store.find('item')
})