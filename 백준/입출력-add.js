const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let a = 0;
let b = 0;
rl.on("line", (line) => {
  // line을 가공하여 변수에 저장
  let input = line.split(" ");
  a = parseInt(input[0]);
  b = parseInt(input[1]);
}).on("close", () => {
  // 저장된 변수를 이용하여 계산 후 출력
  console.log(a + b);
});
