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
