define([], function() {
    return function( attr, obj ) {
      return {
        get: function() { return obj[attr] },
        set: function( value ) { debugger; obj[attr] = value }
      }
    };
  });