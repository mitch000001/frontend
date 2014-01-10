describe "New Item page", ->

  it "displays a new item page", ->
    visit("/items/new").then ->
      find(".header").text().should.contain "New Item"

  it "creates new item on submit", ->
    visit("/").then ->
      $("ul.items li").length.should.eql 1

    visit("/items/new").then ->
      fillIn "#item_date", "2013-01-01"
      fillIn "#item_number", "20121201"
      fillIn "#item_description", "Awesome Company 12.2012"
      fillIn "#item_total_with_tax", "420.12"
      click('button[type=submit]')

    visit("/").then ->
      $("ul.items li").length.should.eql 2