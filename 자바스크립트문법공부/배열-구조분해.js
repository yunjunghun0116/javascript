let [x, y] = [1, 2];
[x, y] = [y, x]; //swap기능이 좀더 간편해짐
console.log(x, y);

let users = ["Junghun", "Taehun", "Duri"];
let [user1, user2, user3] = users;
console.log(user1);
console.log(user2);
console.log(user3);

//default값을 넣어줄 수 있고, default값이 있어도 새로운값이 입력되면 새로운값으로 바뀌게된다.
let [a, , , b, , c = 3] = [1, 2, 4, 5, 6]; //필요없는값은 , ,로 공백처리함으로써 건너뛸수있다
console.log(a, b, c);
