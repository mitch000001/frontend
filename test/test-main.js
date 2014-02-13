var tests = [];
/*jshint camelcase: false */
for (var file in window.__karma__.files) {
  if (/^\/base\/test\/spec/.test(file) && /Spec.js$/.test(file)) {
    tests.push(file);
  }
}

require.config({
  baseUrl: '/base/scripts',

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
    'base64': '../bower_components/js-base64/base64',

    /* Alias text.js for template loading and shortcut the templates dir to tmpl */
    text: '../bower_components/requirejs-text/text',
    tmpl: '../templates',

    /* handlebars from the require handlerbars plugin below */
    Handlebars: '../bower_components/require-handlebars-plugin/hbs/handlebars',

    /* require handlebars plugin - Alex Sexton */
    i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
    json2: '../bower_components/require-handlebars-plugin/hbs/json2',
    hbs: '../bower_components/require-handlebars-plugin/hbs',

    /* test only libraries */
    'jasmine.ajax': '../bower_components/jasmine-ajax/lib/mock-ajax',
  },

  hbs: {
    helpers: true,
    helperDirectory: '/scripts/template-helpers/',
    helperPathCallback: function( name ) {
      return '/scripts/template-helpers/' + name + '.js';
    },
    compileOptions: {}
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
