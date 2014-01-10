Frontend.IndexRoute = Ember.Route.extend({
  model: -> []

  setupController: (controller, model) ->
    controller.set 'items', @store.find('item')

})