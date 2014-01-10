Ember.Handlebars.helper 'l', (date, options) ->
  new Handlebars.SafeString('<time >' + new Date(Date.parse(date)).toDateString() + '</time>')