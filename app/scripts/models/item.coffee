Frontend.Item = DS.Model.extend({
  date: DS.attr "date"
  number: DS.attr "string"
  description: DS.attr "string"
  totalWithTax: DS.attr "number"
  subjectToTurnoverTax: DS.attr "boolean"
  fiscalPeriod: DS.belongsTo('fiscal_period')
})

Frontend.Item.FIXTURES = [
  {
    id: 1
    number: "20140101"
    description: "Awesome Software GmbH 01.13"
    date: new Date()
    totalWithTax: 420.23
  }
]