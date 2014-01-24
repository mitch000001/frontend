define([],
  function() {
    'use strict';

    return {
      useFixtures: true,

      apiUrl: function( path ) {
        if ( this.useFixtures ) {
          return '/fixtures' + path + '.json';
        }
        return '/api' + path;
      }
    };
  });