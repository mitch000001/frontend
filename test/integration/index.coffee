describe "Index page", ->

  it "contains a link to create new items", ->
    visit("/").then ->
      find("a[href*='items/new']").length.should.eql 1

  describe "without recent items", ->
    beforeEach ->
      Frontend.Item.FIXTURES = []
      Frontend.reset()

    it "displays no recent items", ->
      visit("/").then ->
        $("ul.items").should.exist
        $("ul.items li").length.should.eql 0

  describe "with recent items", ->
    beforeEach ->
      Frontend.Item.FIXTURES = [{ id: 42, number: "20130101" }]
      Frontend.reset()

    it "displays recent items", ->
      visit("/").then ->
        $("ul.items").should.exist
        $("ul.items").length.should.eql 1

describe "IndexRoute", ->
  describe "model property", ->
    indexRoute = Frontend.IndexRoute.create()

    # it "should have items", ->
    #   items = indexRoute.models()
    #   expect.items.to.exist