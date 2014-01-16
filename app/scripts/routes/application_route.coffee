Frontend.ApplicationRoute = Ember.Route.extend({
  setupController: (controller) ->
    controller.set 'fiscalPeriods', @store.find(Frontend.FiscalPeriod)
})
