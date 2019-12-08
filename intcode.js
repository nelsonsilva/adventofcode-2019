const OP = (nInputs, nOutputs, fn) => (program, ip, modes) => {
  let inputs = program.slice(ip, ip += nInputs);

  // 0 == position mode // 1 == immediate mode
  let params = inputs.map((i, idx) => modes[idx] ? i : program[i]);

  let res = fn.apply(this, params);

  // fn can change IP 
  if (Array.isArray(res)) {
    // set IP if defined
    ip = res[0] || ip;
    res = res[1];
  }

  if (nOutputs == 1) {
    // single output only for now
    let output = program[ip++];
    program[output] = res;
  }

  return ip;
};

module.exports = (program, inputs, res = 0) => {
  inputs = Array.isArray(inputs) ? inputs : [inputs]; // compat
  let ic = 0; // input counter
  let output;
  const OPS = {
    // sum
    1: OP(2, 1, (a, b) => a + b),
    // mul
    2: OP(2, 1, (a, b) => a * b),
    // input
    3: OP(0, 1, () => inputs[ic++]),
    // output
    4: OP(1, 0, (o) => { output = o; console.log(o); }),
    // jump-if-true
    5: OP(2, 0, (c, ip) => [c != 0 ? ip : undefined]),
    // jump-if-false
    6: OP(2, 0, (c, ip) => [c == 0 ? ip : undefined]),
    // less than
    7: OP(2, 1, (a, b) => a < b ? 1 : 0),
    // equals
    8: OP(2, 1, (a, b) => a == b ? 1 : 0),
  }
  let op, ip = 0;
  while (ip < program.length) {
    opparam = program[ip++].toString();
    op = Number(opparam.substr(-2));
    modes = opparam.substring(0, opparam.length - 2).split('').reverse().map(Number);
    if (op === 99) return output || program[res];
    ip = OPS[op](program, ip, modes);
  }
}
