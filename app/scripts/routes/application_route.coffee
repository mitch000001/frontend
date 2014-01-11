Frontend.ApplicationRoute = Ember.Route.extend({
  setupController: (controller) ->
    controller.set 'fiscalPeriods', @store.find('fiscal_period')
})
