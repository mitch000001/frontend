Frontend.ItemsNewController = Ember.ObjectController.extend({
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

      item.save().then => @transitionToRoute 'index'
  }
})

Frontend.ItemsIndexController = Ember.ArrayController.extend({

})