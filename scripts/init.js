require.config({

  /* starting point for application */
  deps: ['backbone', 'backbone.relational', 'backbone.marionette', 'backbone.cacheit', 'main'],

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.marionette': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    'backbone.relational': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    base64: {
      exports: 'Base64'
    },
    foundation: {
      deps: ['jquery'],
      exports: 'Foundation'
    },
    'foundation.topbar': {
      deps: ['foundation'],
      exports: 'Foundation'
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
    'backbone.relational': 'vendor/backbone.relational',
    'backbone.cacheit': 'vendor/backbone.cacheit',

    /* base64 encoding, used for file uploads */
    base64: '../bower_components/js-base64/base64',

    /* i18n */
    i18next: '../bower_components/i18next/release/i18next.amd-1.7.1',

    /* foundation */
    foundation: '../bower_components/foundation/js/foundation/foundation',
    'foundation.topbar': '../bower_components/foundation/js/foundation/foundation.topbar',

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
