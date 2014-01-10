Frontend.IndexRoute = Ember.Route.extend({
  setupController: (controller) ->
    controller.set 'items', @store.find('item')
})