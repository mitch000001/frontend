Frontend.FiscalPeriodsShowRoute = Ember.Route.extend({
  model: (params) ->
    console.log params
    @store.find "fiscal_period", params.id
  setupController: (controller, model) ->
    console.log controller, model

    controller.set 'items', model.get('items')
})