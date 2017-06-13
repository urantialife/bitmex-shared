// @flow
'use strict';
var _ = require('lodash');

module.exports = {

  // Remove undefined/null/empty string from objects.
  trimObject: function trimObject(obj /*: Object */)/*: Object */ {
    var keys = Object.keys(obj);
    var out = {};
    for (var i = 0; i < keys.length; i++) {
      var val = obj[keys[i]];
      if (val === '' || val === null || val === undefined) continue;
      out[keys[i]] = val;
    }
    return out;
  },

  // Same as _.merge, but merges array arguments together (deeper merge).
  // If given an explicit null, will overwrite with null.
  // Intentionally not using rest/spread for compatibility reasons (uglify)
  mergeWithArrays: function mergeWithArrays(/*::..._args: any[]*/)/*: Object */ {
    var args/*:any[]*/ = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    args.push(function(a, b) {
      // Allow using null to overwrite
      if (_.isArray(a) && b === null) return null;
      // Concat arrays of options together
      if (_.isArray(a) && b) return a.concat(b);
    });
    return _.mergeWith.apply(_, args);
  }

};
