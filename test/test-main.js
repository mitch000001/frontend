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
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    'backbone.relational': {
      deps: ['backbone'],
      exports: 'Backbone.RelationalModel'
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

    /* alias the bootstrap js lib */
    bootstrap: 'vendor/bootstrap',
    'bootstrap-button': 'vendor/bootstrap-button',

    /* Alias text.js for template loading and shortcut the templates dir to tmpl */
    text: '../bower_components/requirejs-text/text',
    tmpl: '../templates',

    /* handlebars from the require handlerbars plugin below */
    Handlebars: '../bower_components/require-handlebars-plugin/hbs/handlebars',

    /* require handlebars plugin - Alex Sexton */
    i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
    json2: '../bower_components/require-handlebars-plugin/hbs/json2',
    hbs: '../bower_components/require-handlebars-plugin/hbs',
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
