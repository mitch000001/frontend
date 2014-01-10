describe "Index page", ->
  it "displays a welcome message", ->
    visit("/").then ->
      find("div.well").text().should.contain "Welcome to Umsatz"

  it "displays recent items", ->
    visit("/").then ->
      find("div.items").length.should.eql 1

describe "ApplicationRoute", ->
  describe "model property", ->
    applicationRoute = Frontend.ApplicationRoute.create()

    it "should have the right number of items", ->
      model = applicationRoute.model()
      model.should.have.length 0

describe "IndexRoute", ->
  describe "model property", ->
    applicationRoute = Frontend.IndexRoute.create()

    it "should have the right number of items", ->
      model = applicationRoute.model()
      model.should.have.length 3