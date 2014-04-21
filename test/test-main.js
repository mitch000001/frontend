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
    foundation: {
      deps: ['jquery'],
      exports: 'Foundation'
    },
    'foundation.topbar': {
      deps: ['foundation'],
      exports: 'Foundation'
    },
    typeahead: {
      deps: ['jquery', 'bloodhound']
    },
    bloodhound: {
      deps: ['jquery'],
      exports: 'Bloodhound'
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

    /* ractive */
    ractive: '../bower_components/ractive/ractive',
    'ractive-backbone': '../bower_components/ractive-adaptors-backbone/ractive-adaptors-backbone',
    'amd-loader': '../bower_components/requirejs-ractive/amd-loader',
    rv: '../bower_components/requirejs-ractive/rv',
    rvc: '../bower_components/requirejs-ractive/rvc',

    /* i18n */
    i18next: '../bower_components/i18next/release/i18next.amd-1.7.1',

    /* foundation */
    foundation: '../bower_components/foundation/js/foundation/foundation',
    'foundation.topbar': '../bower_components/foundation/js/foundation/foundation.topbar',

    /* auto completion */
    typeahead: '../bower_components/typeahead.js/dist/typeahead.bundle',
    bloodhound: '../bower_components/typeahead.js/dist/bloodhound',


    /* Alias text.js for template loading and shortcut the templates dir to tmpl */
    text: '../bower_components/requirejs-text/text',
    tmpl: '../templates',

    /* test only libraries */
    'jasmine.ajax': '../bower_components/jasmine-ajax/lib/mock-ajax',
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});
