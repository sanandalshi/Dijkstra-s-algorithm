// index.js
const prompt = require('prompt-sync')();
const Graph = require('./graph');

const graph = new Graph();

// Add nodes
const nodes = ['A', 'B', 'C', 'D', 'E'];
nodes.forEach(node => graph.addNode(node));

// Add edges with weights
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 5);
graph.addEdge('B', 'D', 10);
graph.addEdge('C', 'E', 3);
graph.addEdge('D', 'E', 4);

const startNode = prompt('Enter the start node: ');
const endNode = prompt('Enter the end node: ');

const { distance, path } = graph.findShortestPath(startNode, endNode);

if (path) {
    console.log(`The shortest path from ${startNode} to ${endNode} is: ${path.join(' -> ')} with a distance of ${distance}`);
} else {
    console.log(`There is no path from ${startNode} to ${endNode}`);
}
