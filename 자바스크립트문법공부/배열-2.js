let userList = [
  { name: "Junghun", age: 23 },
  { name: "Taehun", age: 15 },
  { name: "Duri", age: 10 },
];

let newUserList = userList.map((user, index) => {
  return Object.assign({}, user, {
    id: index + 1,
    isAdult: user.age > 19, //boolean값으로 true/false가 입력
  });
});
console.log(newUserList);
// arr.sort() : 함수객체자체를 바꿔버림
let arr = [27, 8, 5, 13];
let i = 0;
arr.sort((a, b) => {
  console.log(i++, "번째 체크", b, a);
  return a - b;
});
console.log(arr);
// arr.reduce() 인수로 함수를 받고, 누적계산값,현재값을 넣어주면된다.
// arr.reduce((이전 누산값,현재 확인값)=>return 새로운값(누산값에 더해줄것),최초 prev의 값)
// 아래 로직은 최초값 100에 27,8,5,13을 일일이 더해주는함수
const result = arr.reduce((prev, cur) => {
  return prev + cur;
}, 100);
console.log(result);

/* reduce를 이용해 성인만 뽑아내는 기능 */
let resultAdult = userList.reduce((prev, cur) => {
  if (cur.age > 19) {
    prev.push(cur.name);
  }
  return prev;
}, []);
console.log(resultAdult);

const input = ["3", "21 Junkyu", "21 Dohyun", "20 Sunyoung"];
const N = input.shift();
console.log("n:", N);

/* 문자열을 입력받았을때 빠르게 받아오는방법 */
const line = "5\n5\n4\n3\n2\n1"; //입력값의 경우
let [cnt, ...inputs] = line
  .trim()
  .split("\n")
  .map((v) => Number(v));
console.log(cnt);
console.log(inputs);
