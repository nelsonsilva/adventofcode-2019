const assert = require('assert');
const program = require('fs').readFileSync('5.csv').toString().split(',').map(Number);
const run = require('./intcode');

// Part 1
assert(run([3,0,4,0,99], 'Hello') === 'Hello')

assert(run([1002,4,3,4,33], undefined, 4) === 99)

run([...program], 1);

// whether the input is equal to 8
// output 1 (if it is)
run([3,9,8,9,10,9,4,9,99,-1,8], 8)
// 0 (if it is not)
run([3,9,8,9,10,9,4,9,99,-1,8], 7)

// whether the input is less than 8
// output 1 (if it is)
run([3,9,7,9,10,9,4,9,99,-1,8], 7)
// 0 (if it is not)
run([3,9,7,9,10,9,4,9,99,-1,8], 8)

// output 0 if the input was zero or 1 if the input was non-zero
run([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 1)

// output 0 if the input was zero or 1 if the input was non-zero
run([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0)

// output 999 if the input value is below 8, output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8.
const test = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
  1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
  999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99];
run([...test], 7)
run([...test], 8)
run([...test], 9)

run([...program], 5)