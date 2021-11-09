let parent = {};
let rank = {};
const makeSet = (v) => {
  parent[v] = v;
  rank[v] = 0;
};

const find = (v) => {
  if (parent[v] == v) {
    return parent[v];
  } else {
    return find(parent[v]);
  }
};
const union = (u, v) => {
  root1 = find(u);
  root2 = find(v);
  if (root1 != root2) {
    if (rank[root1] < rank[root2]) {
      parent[root1] = root2;
    } else if (rank[root1] == rank[root2]) {
      parent[root2] = root1;
      rank[root1] += 1;
    } else {
      parent[root2] = root1;
    }
  }
};

const kruskal = (vertices_list, edges_list) => {
  vertices_list.forEach((u) => makeSet(u));
  const edges = edges_list.slice();
  edges.sort((a, b) => a[0] - b[0]);
  let mst = [];
  let sum = 0;
  edges.forEach((edge) => {
    [cost, u, v] = edge;
    if (find(u) != find(v)) {
      union(u, v);
      mst.push(edge);
      sum += cost;
    }
  });
  return [mst, sum];
};

const input = [
  [1, 2, 5],
  [1, 3, 4],
  [2, 3, 2],
  [2, 4, 7],
  [3, 4, 6],
  [3, 5, 11],
  [4, 5, 3],
  [4, 6, 8],
  [5, 6, 8],
];
const vertices = [];
const edges = [];
const n = 6;
const m = 9;
for (let i = 0; i < n; i++) {
  vertices.push(`${i + 1}`);
}
for (let i = 0; i < 9; i++) {
  [u, v, c] = input[i];
  edges.push([c, `${u}`, `${v}`]);
}
const result = kruskal(vertices, edges);
console.log(result[0]);
console.log(result[1]);
