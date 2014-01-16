Frontend = window.Frontend = Ember.Application.create({
  LOG_TRANSITIONS: true
  LOG_TRANSITIONS_INTERNAL: true
})
Frontend.ApplicationAdapter = DS.FixtureAdapter

Frontend.Router.map ->
  @resource "fiscalPeriods", { path: "fiscalPeriods/:fiscal_period_id" }, ->
    # @route "new"
    @route "show", { path: "/" }

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
