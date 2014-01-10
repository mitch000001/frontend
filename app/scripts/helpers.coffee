Ember.Handlebars.helper 'l', (date, options) ->
  new Handlebars.SafeString('<time >' + date.toDateString() + '</time>')