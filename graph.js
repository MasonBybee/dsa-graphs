class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.addVertex(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let vert of vertex.adjacent) {
      this.removeEdge(vertex, vert);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let values = [];
    while (toVisitStack.length) {
      let currPerson = toVisitStack.pop();
      values.push(currPerson.value);
      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return values;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    let values = [];
    while (toVisitStack.length) {
      let currPerson = toVisitStack.shift();
      values.push(currPerson.value);
      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return values;
  }
}

module.exports = { Graph, Node };
