'use strict';
const _ = require('lodash');

module.exports = {

  // Remove undefined/null/empty string from objects.
  trimObject(obj/*: Object */)/*: Object */ {
    const keys = Object.keys(obj);
    const out = {};
    for (let i = 0; i < keys.length; i++) {
      const val = obj[keys[i]];
      if (val === '' || val === null || val === undefined) continue;
      out[keys[i]] = val;
    }
    return out;
  },

  // Same as _.merge, but merges array arguments together (deeper merge).
  // If given an explicit null, will overwrite with null.
  mergeWithArrays(...args/*: Object[] */)/*: Object */ {
    args.push(function(a, b) {
      // Allow using null to overwrite
      if (_.isArray(a) && b === null) return null;
      // Concat arrays of options together
      if (_.isArray(a) && b) return a.concat(b);
    });
    return _.mergeWith.apply(_, args);
  }

};
