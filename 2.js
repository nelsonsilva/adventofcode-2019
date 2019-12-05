const assert = require('assert');
const codes = require('fs').readFileSync('2.csv').toString().split(',').map(Number);

const run = (codes, res = 0) => {
  for (let op, a, b, t, i=0; i < codes.length; i++) {
    op = codes[i];
    switch (op) {
      case 1:
        a = codes[++i], b = codes[++i], t = codes[++i]; 
        codes[t] = codes[a] + codes[b];
        break;
      case 2:
        a = codes[++i], b = codes[++i], t = codes[++i]; 
        codes[t] = codes[a] * codes[b];
        break;
      case 99:
        return codes[res];
    }  
  }
}

assert(run([1,9,10,3,2,3,11,0,99,30,40,50]) === 3500)
assert(run([1,0,0,0,99]) === 2)
assert(run([2,3,0,3,99], 3) === 6)
assert(run([2,4,4,5,99,0], 5) === 9801)
assert(run([1,1,1,4,99,5,6,0,99]) === 30)

// Part 1
const program = [...codes];
program[1] = 12;
program[2] = 2;
console.log(run(program));

// Part 2
const find = (product) => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const program = [...codes];
      program[1] = noun; program[2] = verb;
      if (run(program) === product) {
        return {noun, verb};
      }
    }
  }
};

const {noun, verb} = find(19690720);
console.log(noun * 100 + verb);