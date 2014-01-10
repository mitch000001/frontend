Frontend.Item = DS.Model.extend({
  date: DS.attr "date"
  title: DS.attr "string"
})

Frontend.Item.FIXTURES = [
  {
    id: 1
    date: new Date()
    title: "Hey Ya"
  }
]