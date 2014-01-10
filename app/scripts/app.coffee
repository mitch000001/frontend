Frontend = window.Frontend = Ember.Application.create({
  LOG_TRANSITIONS: true
})

Frontend.Router.map ->
  @resource "items", ->
    @route "new"

# Order and include as you please.
require 'scripts/controllers/*'
require 'scripts/store'
require 'scripts/models/*'
require 'scripts/routes/*'
require 'scripts/views/*'
require 'scripts/router'
