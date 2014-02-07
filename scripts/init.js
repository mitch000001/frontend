require.config({

  /* starting point for application */
  deps: ['backbone.marionette', 'backbone.relational', 'backbone.cacheit', 'main'],

  shim: {
    backbone: {
      deps: [
        'underscore',
        'jquery',
      ],
      exports: 'Backbone'
    },
    'backbone.relational': {
      deps: ['backbone'],
      exports: 'Backbone.RelationalModel'
    },
    base64: {
      exports: 'Base64'
    }
  },

  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone-amd/backbone',
    underscore: '../bower_components/underscore-amd/underscore',

    /* alias all marionette libs */
    'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone.relational': '../bower_components/backbone-relational/backbone-relational',
    'backbone.cacheit': 'vendor/backbone.cacheit',

    /* base64 encoding, used for file uploads */
    'base64': '../bower_components/js-base64/base64',

    /* Alias text.js for template loading and shortcut the templates dir to tmpl */
    text: '../bower_components/requirejs-text/text',
    tmpl: '../templates',

    /* handlebars from the require handlerbars plugin below */
    Handlebars: '../bower_components/require-handlebars-plugin/hbs/handlebars',

    /* require handlebars plugin - Alex Sexton */
    i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
    json2: '../bower_components/require-handlebars-plugin/hbs/json2',
    hbs: '../bower_components/require-handlebars-plugin/hbs'
  },

  hbs: {
    helpers: true,
    helperDirectory: '/scripts/template-helpers/',
    helperPathCallback: function( name ) {
      return '/scripts/template-helpers/' + name + '.js';
    },
    compileOptions: {}
  }
});
