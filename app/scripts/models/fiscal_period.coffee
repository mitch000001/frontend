Frontend.FiscalPeriod = DS.Model.extend({
  title: DS.attr "string"
  items: DS.hasMany("item")
})

Frontend.FiscalPeriod.FIXTURES = [
  {
    id: 1
    title: "2013"
    items: [1]
  }
  {
    id: 2
    title: "2014"
  }
]