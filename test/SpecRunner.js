require.config({
  baseUrl: 'scripts',
  paths: {
    'jquery'        : '../bower_components/jquery/jquery',
    'underscore'    : '../bower_components/underscore/underscore',
    'backbone'      : '../bower_components/backbone/backbone',
    'mocha'         : '../bower_components/mocha/mocha',
    'chai'          : '../bower_components/chai/chai',
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    mocha: {
      exports: 'mocha'
    }
  },

});

require(['require', 'chai', 'mocha', 'jquery'], function(require, chai, mocha, jquery){
  // chai.use(chaiJquery);

  mocha.setup('bdd');

  assert = chai.assert;
  expect = chai.expect;
  should = chai.should();

  require([
    'spec/test.js',
  ], function(require) {
    mocha.run();
  });

});