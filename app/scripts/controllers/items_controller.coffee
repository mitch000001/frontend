Frontend.ItemsNewController = Ember.ObjectController.extend({
  content: Ember.Object.create()
  actions: {
    saveItem: ->

      number = @get 'number'
      date = new Date(Date.parse @get('date'))
      description = @get 'description'
      totalWithTax = @get 'totalWithTax'
      return unless number.trim()

      item = @store.createRecord 'item', {
          number
          date
          description
          totalWithTax
        }

      @set('number', '')

      onSuccess = (items) =>
        items.pushObject item
        @transitionToRoute 'index'

      item.save().then =>
        fiscalPeriod = @content.fiscalPeriod
        fiscalPeriod.get("items").then onSuccess, null


  }
})

Frontend.ItemsIndexController = Ember.ArrayController.extend({
})