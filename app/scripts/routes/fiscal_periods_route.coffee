Frontend.FiscalPeriodsShowRoute = Ember.Route.extend({
  model: (params, transition) ->
    fiscalPeriodId = transition.params.fiscal_period_id
    fiscalPeriod = @store.find Frontend.FiscalPeriod, fiscalPeriodId
    fiscalPeriod.get "items"
    fiscalPeriod

  setupController: (controller, model) ->
    controller.set 'items', model.get("items")
})