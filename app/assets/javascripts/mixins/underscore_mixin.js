_.mixin({
  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  },
  camelize: function(str) {
    // https://github.com/epeli/underscore.string/blob/master/camelize.js
    return str.trim().replace(/[-_\s]+(.)?/g, function(match, c) {
      return c ? c.toUpperCase() : '';
    });
  },
  classify: function(str) {
    return this(this(str).capitalize()).camelize();
  },
  classes: function(stateClasses) {
    return _.reduce(stateClasses, function(a, value, key){
      if (value) { return a + key + " " }
      return a
    }, "").trim()
  }
});