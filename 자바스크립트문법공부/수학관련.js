let number = 123;
//toString(진수)를 통해 2,10,16진수등 모두 표현할 수 있다
console.log(number.toString(2));
console.log(number.toString());
console.log(number.toString(16));

let testNum1 = 1.1;
let testNum2 = 1.9;

console.log("올림", Math.ceil(testNum1), Math.ceil(testNum2));
console.log("내림", Math.floor(testNum1), Math.floor(testNum2));
console.log("반올림", Math.round(testNum1), Math.round(testNum2));

let rate = 55.1274;
//여기서 주의할점은 toFixed는 Number타입이 아닌 String으로 값을 리턴해준다.
//그렇기때문에 Number(rate.toFixed(2))처럼 숫자로 다시 변환후 사용하기도 한다
console.log("소수점에서 반올림", rate.toFixed(2));

let margin = "123px5";
//parseInt는 문자열중 앞에서부터 숫자가 있는부분만 자른후 Number타입으로 리턴해주고
//Number는 만약 숫자로만구성된게 아닐경우 NotaNumber라는 의미의 NaN을 반환한다.
console.log(parseInt(margin), Number(margin));
let testNum3 = "f3";
console.log(parseInt(testNum3, 16)); //원하는 진수 ex)16진수, 1과0으로만이루어졌으면 2진수 처럼 사용가능

//1~100까지의 숫자 - Math.random : 0~1사이의 랜덤한값을 반환
console.log("랜덤값", Math.floor(Math.random() * 100) + 1);

console.log("최대", Math.max(1, 2, 3, 7, -10, 9, 6));
console.log("최대", Math.max(...[1, 2, 3, 7, -10, 9, 6]));

console.log("절댓값", Math.abs(-1));

console.log("제곱", Math.pow(2, 10));
console.log("제곱근", Math.sqrt(16));
