let a = gets().split(" ");
let b = gets().split(" ");
let count = 0;
let cnt = Number(a[1]);

function mergeSort(m) {
  if (m.length <= 1) {
    return m;
  }
  let mid = Math.floor(m.length / 2);

  let left = m.slice(0, mid);
  let right = m.slice(mid);

  left = mergeSort(left);
  right = mergeSort(right);

  return merge(left, right);

  function merge(left, right) {
    let result = [];
    //종료 조건 : 정해진 횟수에 도달하면 그상태로 종료
    if (count == cnt) {
      return (result = left.concat(right));
    }
    //병합정렬 과정 수행
    while (left.length != 0 && right.length != 0) {
      if (a[2] == "A") {
        //정방향 정렬
        if (left[0] <= right[0]) {
          result.push(left[0]);
          left.shift();
        } else {
          result.push(right[0]);
          right.shift();
        }
      } else {
        //역방향 정렬
        if (left[0] > right[0]) {
          result.push(left[0]);
          left.shift();
        } else {
          result.push(right[0]);
          right.shift();
        }
      }
    }
    while (left.length != 0) {
      result.push(left[0]);
      left.shift();
    }
    //ok를 없애고 시도해보고 싶었으나 코딩테스트 사이트 기간 종료됨..
    while (right.length != 0) {
      result.push(right[0]);
      right.shift();
    }
    //과정 진행 후 카운팅
    count++;
    return result;
  }
}
