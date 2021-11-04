let user = {
  name: "Junghun",
  age: 23,
};
//이렇게 복사할경우 user가 가리키는 주소를 cloneUser또한 함께 가리키게된다.
const cloneUser = user;
//아래와 같이 복사할경우 {}를 생성후 user의 값을 그대로 할당하는 방식으로
//올바른 복사가 진행된다.
const goodCloneUser = Object.assign({ gender: "male" }, user);
user.age = 25;
console.log(cloneUser);
console.log(goodCloneUser);

const info1 = {
  age: 30,
};
const info2 = {
  gender: "female",
};
const info3 = {
  name: "Taehun",
};
//아래와 같이 모든 key:value의 정보가 합쳐진 결과의 객체를 리턴해주기도한다.
const newUser = Object.assign({}, info1, info2, info3);
console.log(newUser);
console.log(Object.keys(newUser));
console.log(Object.values(newUser));
console.log(Object.entries(newUser)); //[key,value]로 이루어진 각 쌍의 정보를 배열로 넣어 리턴
