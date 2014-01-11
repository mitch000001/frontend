Frontend = window.Frontend = Ember.Application.create({
  LOG_TRANSITIONS: true
  LOG_TRANSITIONS_INTERNAL: true
})
Frontend.ApplicationAdapter = DS.FixtureAdapter
# Frontend.Store =  DS.Store.Extend({
#   adapter: Frontend.ApplicationAdapter
# })

Frontend.Router.map ->
  @resource "fiscalPeriods", ->
    @route "new"
  @resource 'fiscalPeriod', { path: '/fiscalPeriod/:id' }

  @resource "items", ->
    @route "new"

# Order and include as you please.
require 'scripts/lib/*'
require 'scripts/helpers'
require 'scripts/controllers/*'
require 'scripts/models/*'
require 'scripts/routes/**'
require 'scripts/views/*'
require 'scripts/router'
