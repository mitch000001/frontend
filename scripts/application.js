define([
    'backbone',
    'communicator',
    'hbs!tmpl/welcome'
  ],

  function( Backbone, Communicator, WelcomeTmpl ) {
    'use strict';

    var welcomeTmpl = WelcomeTmpl;

    var App = new Backbone.Marionette.Application();

    App.addRegions({});

    App.addInitializer( function () {
      document.body.innerHTML = welcomeTmpl({ success: 'umsatz' });
      Communicator.mediator.trigger('APP:START');
    });

    return App;
  });
