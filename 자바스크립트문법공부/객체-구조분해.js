let user = { name: "Junghun", age: 23 };
let { name: userName, age: userAge } = user;
// 객체의 키값 : 새로 설정할 이름 을 통해서 새로운 변수이름으로 할당할수있다
console.log(userName);
console.log(userAge);

let user2 = {
  name: "Duri",
  age: 10,
  gender: "female",
};
let { name: name1, age: age1, gender: gender1 = "male" } = user; //default값으로 변수를 설정해줄수있다.
console.log(name1, age1, gender1);
let { name: name2, age: age2, gender: gender2 = "male" } = user2;
console.log(name2, age2, gender2);
