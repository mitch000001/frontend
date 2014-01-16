Frontend.ItemsNewRoute = Ember.Route.extend({
  model: (params, transition) ->
    fiscalPeriodId = transition.params.fiscal_period_id

    { fiscalPeriodId }

  setupController: (controller, object) ->
    fiscalPeriod = @store.find Frontend.FiscalPeriod, object.fiscalPeriodId
    fiscalPeriod.get("items")
    controller.set "fiscalPeriod", fiscalPeriod
})

Frontend.ItemsIndexRoute = Ember.Route.extend({
  setupController: (controller) ->
    controller.set "items", @store.find(Frontend.Item)
})