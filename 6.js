const assert = require('assert');
const fs = require('fs');
const data = fs.readFileSync('6.txt').toString().split('\n');

const buildOrbits = (data) => {
  // map of orbiter => body it orbits
  const orbiters = {}

  data.forEach(orbit => {
    let [a, b] = orbit.split(')')
    orbiters[b] = a;
  });

  const _build = (orbiter) => {
    let body = orbiters[orbiter];
    return body ? [body, ..._build(body)] : [];
  }

  const orbits = {};

  Object.keys(orbiters).forEach(k => orbits[k] = _build(k));

  return orbits;
}

const orbitCount = (data) => Object.values(buildOrbits(data)).reduce((t, orbits) => t + orbits.length, 0);

const orbitTransfers = (data, src, dst) => {
  const orbits = buildOrbits(data);
  const srcOrbit = orbits[src];
  const dstOrbit = orbits[dst];
  let transfers = 0;
  for (let i = 0; i < srcOrbit.length; i++, transfers++) {
    let c = srcOrbit[i];
    // find closest common body
    let idx = dstOrbit.indexOf(c);
    if (idx !== -1) {
      transfers+=idx;
      break;
    }
  } 
  return transfers;
}

// Part I
assert(orbitCount([
  "COM)B",
  "B)C",
  "C)D",
  "D)E",
  "E)F",
  "B)G",
  "G)H",
  "D)I",
  "E)J",
  "J)K",
  "K)L"
  ]) === 42);

console.log(orbitCount(data));

// Part 2
assert(orbitTransfers([
  "COM)B",
  "B)C",
  "C)D",
  "D)E",
  "E)F",
  "B)G",
  "G)H",
  "D)I",
  "E)J",
  "J)K",
  "K)L",
  "K)YOU",
  "I)SAN",
  ], "YOU", "SAN") === 4);

  console.log(orbitTransfers(data, "YOU", "SAN"));