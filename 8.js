const assert = require('assert');
const data = require('fs').readFileSync('8.txt').toString();

const image = (data, width, height) => {
  const res = [];
  const size = width * height;
  const n = data.length / size;
  for (let l = 0; l < n; l++) {
    // layer start
    let lstart = l * size,layer = [];
    for (let y = 0; y < height; y++) {
      // row start
      let rstart = lstart + y * width, row = [];
      for (let x = 0; x < width; x++) {
        row.push(Number(data[rstart + x]));
      }
      layer.push(row);
    }
    res.push(layer);
  }
  return res;
}

assert(image('123456789012', 3, 2).length === 2);

const count = (layer, digit) => {
  let c = 0;
  layer.forEach(r => r.forEach(p => { if (p === digit) c++ }));
  return c;
}

let layer, min = Number.POSITIVE_INFINITY;
for (let l of image(data, 25, 6)) {
  let c = count(l, 0);
  if (c < min) {
    min = c;
    layer = l;
  }
}

console.log(count(layer, 1) * count(layer, 2))

const flatten = (data, width, height) => {
  const layers = image(data, width, height).reverse();
  const res = [];
  for (let l of layers) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let c = l[y][x];
        if (c !== 2) {
          res[y] = res[y] || [];
          res[y][x] = c;
        }
      }
    }
  }
  return res;
}

const res = flatten(data, 25, 6);

for (let r of res) {
  console.log(r.map(c => c === 1 ? 'x' : ' ').join(''));
}
