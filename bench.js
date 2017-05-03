// @flow
/* eslint no-console: 0, spaced-comment: 0 */
const assert = require('assert');
const _ = require('lodash');

/*:: type Case = {iterations: number, name: string, fn: Function}; */
/*:: type IBench = {setup?: Function, cases: Array<Case>, teardown?: Function, assertEqual?: boolean};*/
module.exports = function createBench({setup, cases, teardown, assertEqual}/*: IBench */) {
  // Storage for assertEqual
  const resultStorage = [];

  let data = {};

  // -- PREPARE --

  // Setup Hook
  if (setup) data = setup();

  // -- HOT --

  cases.forEach(function({iterations, name, fn}/*: Case*/, i) {
    if (assertEqual) resultStorage[i] = fn(data);
    times(5, () => {
      const hot = () => fn(data);
      const labelName = `${name} (${iterations} iterations)`;

      // Run bench
      console.time(labelName);
      times(iterations, hot);
      console.timeEnd(labelName);
    });
  });

  // -- FIN --

  // Teardown hook
  if (teardown) teardown();

  // Assert all cases returns the same result
  if (assertEqual) resultStorage.forEach((val) => assert.deepEqual(val, resultStorage[0]));
};

function times(n, fn) {
  for (let i = 0; i < n; i++) fn();
}
