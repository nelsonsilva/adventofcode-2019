const assert = require('assert');
const program = require('fs').readFileSync('7.csv').toString().split(',').map(Number);
const run = require('./intcode');

// Heap's method 
// https://stackoverflow.com/questions/9960908/permutations-in-javascript
// \_(ツ)_/¯
function permute(permutation) {
  let length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

const range = (n, m) => Array.from({length: m - n + 1}, (_, i) => n + i);

const signal = (program, input = 0, n = 5) => {
  // amplifier function
  const amplifier = phase => input => run([...program], [phase, input]);
  // chain function
  const chain = phases => input => phases.map(amplifier).reduce((c, a) => a(c), input);

  const alternatives = permute(range(0, n - 1));

  let max = Number.NEGATIVE_INFINITY;
  for (let phases of alternatives) {
    let out = chain(phases)(input);
    if (out > max) {
      max = out;
    }
  }
  return max;
}

assert(signal([3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]) == 43210);
assert(signal([3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0]) == 54321);
assert(signal([3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]) == 65210);

console.log(signal(program));