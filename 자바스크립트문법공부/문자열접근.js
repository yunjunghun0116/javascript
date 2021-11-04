let strings1 = "안녕하세요";
let strings2 = "Hello, nice to meet you!   ";

console.log(strings1[1]);

console.log(strings2.toLowerCase());
// 인자가 첫번째로 나오는 순간의 index를 반환
// 만약 없을경우 -1을 반환한다. 그렇기때문에 indexOf(a) > -1일경우 includes와 같은기능을 한다.
console.log(strings2.indexOf("to"));

console.log(strings2.slice(1, 4));
console.log(strings2.slice(2)); //index : 2번째부터 끝까지
console.log(strings2.slice(2, -1)); //index : 2 ~ 뒤에서 index : 1 까지

console.log(strings2.substring(1, 4)); // substring은 시작과 끝이 바뀌어도 상관없다. -> slice와의 차이점
console.log(strings2.substr(1, 4)); // substr(n,m) : n부터 m개의 원소를 반환

console.log(strings2.trim()); // 맨앞,뒤의 공백을 제거

console.log(strings2.repeat(3)); // 해당 문자열을 repeat(n)에서 n번 반복

console.log("a".codePointAt(0)); // 아스키코드를 10진법의 수로 반환
console.log(String.fromCodePoint(97)); //아스키코드 10진법의 수를 문자로 변환
