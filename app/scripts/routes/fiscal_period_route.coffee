Frontend.FiscalPeriodNewRoute = Ember.Route.extend({
  model: -> {}
})

Frontend.FiscalPeriodIndexRoute = Ember.Route.extend({
  setupController: (controller) ->
    controller.set 'items', @store.find('item')
})