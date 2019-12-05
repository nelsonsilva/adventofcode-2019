// Part 1
// ugly one liner
console.log(require('fs').readFileSync('1.txt').toString().split('\n').reduce((t, m) => t + (Math.floor(m / 3) - 2), 0));

// Part 2
const assert = require('assert');
const modules = require('fs').readFileSync('1.txt').toString().split('\n');

const sum = (a, b) => a + b;

const fuelFor = (m) => {
  const fuel = Math.floor(m / 3) - 2;
  return fuel >= 0 ? fuel + fuelFor(fuel) : 0;
}

assert(fuelFor(14) === 2);
assert(fuelFor(1969) === 966);
assert(fuelFor(100756) === 50346);

console.log(modules.map(fuelFor).reduce(sum));