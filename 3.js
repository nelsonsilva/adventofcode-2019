const assert = require('assert');
const wires = require('fs').readFileSync('3.csv').toString().split('\n').map(w => w.split(','));

const manhatan = (x, y) => Math.abs(x) + Math.abs(y);

const move = ([x, y], dir) => {
  switch (dir) {
    case 'U':
      y++;
      break;
    case 'D':
      y--;
      break;
    case 'R':
      x++;
      break;
    case 'L':
      x--;
      break;
  }
  return [x, y];
};

const closest = (wires, draw = false) => {
  let res = Number.POSITIVE_INFINITY;
  let panel = {};
  let xmax = Number.NEGATIVE_INFINITY, ymax = Number.NEGATIVE_INFINITY; 
  
  const steps = (ix, iy) => {
    let s = 0;
    wires.forEach(w => {
      let x = 0, y = 0;
      for (let segment of w) {
        let dir = segment[0], length = Number(segment.substr(1));
        for(let i = 0; i < length; i++) {
          s++;
          [x, y] = move([x, y], dir);
          if (x == ix && y == iy) {
            return;
          }
        }
      }
    });
    return s;
  };

  for (let w = 0; w < wires.length; w++) {
    let x = 0, y = 0;
   
    wires[w].forEach(segment => {
      let dir = segment[0], length = Number(segment.substr(1));
      for(let i = 0; i < length; i++) {
        [x, y] = move([x, y], dir);
        panel[x] = panel[x] || {};
        panel[x][y] = panel[x][y] || new Set();
        panel[x][y].add(w);
        // keep track of min distance
        if(panel[x][y].size > 1) {
          // Part 1
          // let cost = manhatan(x, y);
          // Part 2
          let cost = steps(x, y);
          if (cost < res) {
            res = cost;
          }
        }
        // draw
        xmax = Math.max(xmax, Math.abs(x));
        ymax = Math.max(ymax, Math.abs(y));
      }
    });
  }
  if (draw) {
    for (let y = ymax; y > -ymax; y--) {
      let line = '';
      for (let x = -xmax; x < xmax; x++) {
        line += (panel[x] && panel[x][y]) ? (panel[x][y].size > 1 ? 'X' : '*') : '.';
      }
      console.log(line);
    }
  }
  return res;
}

// Part 1
// assert(closest([['R8','U5','L5','D3'],['U7','R6','D4','L4']], true) === 6)
// assert(closest([
//   ['R75','D30','R83','U83','L12','D49','R71','U7','L72'],
//   ['U62','R66','U55','R34','D71','R55','D58','R83']
// ]) === 159)
// assert(closest([
//   ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'],
//   ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7']
// ]) === 135)

// console.log(closest(wires));

// Part 2
assert(closest([['R8','U5','L5','D3'],['U7','R6','D4','L4']], true) === 30)
assert(closest([
  ['R75','D30','R83','U83','L12','D49','R71','U7','L72'],
  ['U62','R66','U55','R34','D71','R55','D58','R83']
]) === 610)
assert(closest([
  ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'],
  ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7']
]) === 410)

console.log(closest(wires));