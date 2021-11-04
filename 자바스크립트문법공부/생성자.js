function Item(title, price) {
  //this = {}처럼 빈껍질을 만들어놓고 입력받은 값을 할당해준다.
  this.title = title;
  this.price = price;
  this.showPrice = function () {
    console.log(`가격은 ${price}원 입니다.`);
  };
}

const item1 = new Item("인형", 3000);
//여기서 만약 new를 제거할경우 undefined로 된다. 그 이유는 new를 통해 생성자를 생성하지만
//new가없을땐 함수를 실행하기때문에 반환값이 없고, 그래서 return값인 undefined가 item2에 들어가게된다.
const item2 = Item("가방", 4000);
const item3 = new Item("지갑", 9000);

console.log(item1, item2, item3);
item3.showPrice();
