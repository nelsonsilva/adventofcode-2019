const assert = require('assert');

const digits = (n) => n.toString().split('');

const check = (n, low = n, high = low) => [
    // It is a six-digit number
    (n) => n.toString().length == 6,

    // The value is within the range given in your puzzle input
    (n) => n >= low && n <= high,

    // Part 1
    // Two adjacent digits are the same (like 22 in 122345)
    // (n) => {
    //   const d = digits(n); 
    //   for (let i = 1; i < d.length; i++) {
    //     if (d[i] === d[i - 1]) {
    //       return true;
    //     }
    //   }
    //   return false;
    // },

    // Part 2
    // Two adjacent digits are the same (like 22 in 122345)
    // the two adjacent matching digits are not part of a larger group of matching digits.
    (n) => {
      let p = -1, pc;
      const d = digits(n); 
      for (let i = 0; i < d.length; i++) {
        if (d[i] === p) {
          pc++;
        } else {
          if (pc == 2) {
            return true;
          }
          p = d[i]; pc = 1;
        }
      }
      return pc == 2;
    },

    // Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679)
    (n) => {
      let p = Number.NEGATIVE_INFINITY;
      for (const d of digits(n)) {
        if (d < p) {
          return false;
        }
        p = d;
      }
      return true;
    }
  ].every(check => check(n));

const gen = (low, high) => {
  const res = [];
  for (let i = low; i <= high; i++) {
    if (check(i, low, high)) {
      res.push(i);
    }
  }
  return res;
}

// Part 1
// assert(check(111111));
// assert(!check(223450));
// assert(!check(123789));
// console.log(gen(240920, 789857).length);

// Part 2
assert(check(112233));
assert(!check(123444));
assert(check(111122));
console.log(gen(240920, 789857).length);