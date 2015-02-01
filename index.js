'use strict';
var _ = require('lodash');


// Simple way to filter by a deep arg.
// 
// Usage:
// 
// var collections = [
//     {id: 1, name: 'xyz'}, 
//     {id: 2,  name: 'ds'},
//     {id: 3,  name: 'rtrt'},
//     {id: 4,  name: 'nhf'},
//     {id: 5,  name: 'qwe'}
// ];
//
// var filtered = _.findByValues(collections, "id", [1,3,4]);
_.mixin({
  'filterByValues': function(collection, property, values) {
    return _.filter(collection, function(item) {
      return _.contains(values, item[property]);
    });
  }
});

// Simple plugin used for simple english message files (works 98% of the time, all the time)
// 
// Usage:
//
// var msg = "You have " + count + _.pluralize(" message", count) + ".";
_.mixin({'pluralize': function(number){
  return number === 1 ? '' : 's';
}});

// Capitalize a string.
//
// Usage:
//
// _.capitalize('daily') // -> 'Daily'
_.mixin({'capitalize': function(string) {
  return string[0].toUpperCase() + string.slice(1);
}});

// _.result with support for arguments.
//
// Usage:
//
// var messages = {
//   aKey: function(data, moreData) { return data + moreData; },
//   bKey: 'okay'
// }
// 
// var someData = 'foo', someMoreData = 'bar';
// var msg = _.resultWithArgs(messages, 'aKey', someData, someMoreData) // 'foobar'
// var msg2 = _.resultWithArgs(messages, 'bKey', someData, someMoreData) // 'okay'
//
_.mixin({'resultWithArgs': function(object, key) {
  if (object) {
    var value = object[key];
    return typeof value === "function" ? 
      arguments.length > 2 ? 
        object[key].apply(object, [].slice.call(arguments, 2)) : 
        object[key]()
      :
      value;
  }
}});
