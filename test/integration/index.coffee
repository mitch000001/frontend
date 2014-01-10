describe "Index page", ->
  it "displays a welcome message", ->
    visit('/').then ->
      find('div.well').text().should.contain 'Welcome to Umsatz'

describe "ApplicationRoute", ->
  describe "model property", ->
    applicationRoute = Frontend.ApplicationRoute.create()

    it "should have the right number of items", ->
      model = applicationRoute.model()
      model.should.have.length 3
