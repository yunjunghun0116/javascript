class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
console.log(root.value, root.left.value, root.right.value);
