const line = require("fs").readFileSync("/dev/stdin", "utf8");

let [cnt, ...inputs] = line
  .trim()
  .split("\n")
  .map((v) => Number(v));

const input = inputs.sort((a, b) => a - b);

console.log(input.join("\n"));
