let myarray = [1, 2, 3, 4, 5];
/*
push : 뒤에 삽입
pop : 뒤에 삭제
unshift : 앞에 삽입
shift : 앞에 삭제
*/
console.log(myarray.push(10)); //뒤에 삽입후 배열의 길이를 리턴
console.log(myarray.pop()); //뒤에서 삭제된 원소를 리턴
console.log(myarray.unshift(123)); //앞에 삽입한후에 배열의 길이를리턴
console.log(myarray.shift()); //앞에서 삭제된 원소를 리턴
console.log("-----------");

let arrayTest = [1, 2, 3, 4, 5, 6];
console.log(arrayTest.splice(1, 2)); //splice(n,m) : n번째인덱스에서부터 m개의원소 삭제하고, 삭제된값을 리턴
console.log(arrayTest.splice(1, 2, 7, 8, 9, 10, 11));
//splice(n,m,원소들) : n번째인덱스에서부터 m개의원소 삭제 한 후에 해당위치에 원소들을 추가

arrayTest = [1, 2, 3, 4, 5, 6, 7];
//slice(n,m) : n번째인덱스에서부터 m번째인덱스까지(n포함,m불포함),m을안쓰면 끝까지를 리턴
//slice()만쓰고 괄호안에 인자를 안넣을경우 배열이복사된다
console.log(arrayTest.slice(1));

let arr1 = [1, 2, 3];
let arr2 = [5, 6];
console.log(arr1.concat(arr2)); // 두개의 배열을 합친 객체를 리턴

let users = ["Junghun", "Taehun", "Duri"];
users.forEach((user, index, arr) => {
  //user : 각원소, index : 각 원소의 인덱스, arr : user배열자체
  console.log(user, index, arr);
});

let check = [1, 2, 3, 1, 7, 5, 6, 1];
console.log(check.indexOf(1)); //해당원소중 가장 앞에 있는 원소의 인덱스를 반환, 없을경우 -1리턴
console.log(check.indexOf(1, 2)); //indexOf(n,m) : m번째인덱스에서부터 탐색을 할때 가장 앞에있는 원소의 인덱스 반환
console.log(check.lastIndexOf(123)); //해당원소중 가장 뒤에 있는 원소의 인덱스를 반환, 없을경우 -1리턴
console.log(check.includes(12)); // includes(원소) : 원소를 포함할경우 true,아니면 false를 리턴한다
console.log(check.reverse()); //역순으로 재정렬한다 : check의 포인터가 가리키는 주소로 간 후 배열자체의 순서를 뒤바꾼다
//arr.filter(함수) : 함수로 true값을 반환하는 요소들로 이루어진 배열을 리턴해준다.
const findResult = check.filter((item) => {
  return item % 2 !== 0; //홀수들로 구성된 배열을 얻기위함
});
console.log(findResult);

//arr.find(함수) : 함수로 true값을 반환하는 첫번째 요소를 반환하고 끝난다. 만약 못찾았을경우 undefined 를 반환한다.
//arr.findIndex(함수) : 위와 같지만 값이아닌 해당 인덱스를 반환하고 끝난다.
let userList = [
  { name: "Junghun", age: 23 },
  { name: "Taehun", age: 15 },
  { name: "Duri", age: 10 },
];
const result = userList.find((user) => {
  if (user.age < 12) {
    return true;
  }
});
console.log(result);
