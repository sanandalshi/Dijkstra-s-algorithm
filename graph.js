// graph.js
class Graph {
    constructor() {
        this.nodes = new Set();
        this.edges = new Map();
    }

    addNode(node) {
        this.nodes.add(node);
        this.edges.set(node, []);
    }

    addEdge(node1, node2, weight) {
        this.edges.get(node1).push({ node: node2, weight });
        this.edges.get(node2).push({ node: node1, weight });
    }

    dijkstra(startNode) {
        let distances = {};
        let previousNodes = {};
        let pq = new PriorityQueue();

        this.nodes.forEach(node => {
            if (node === startNode) {
                distances[node] = 0;
                pq.enqueue(node, 0);
            } else {
                distances[node] = Infinity;
                pq.enqueue(node, Infinity);
            }
            previousNodes[node] = null;
        });

        while (!pq.isEmpty()) {
            let { value: currentNode } = pq.dequeue();

            this.edges.get(currentNode).forEach(neighbor => {
                let distance = distances[currentNode] + neighbor.weight;

                if (distance < distances[neighbor.node]) {
                    distances[neighbor.node] = distance;
                    previousNodes[neighbor.node] = currentNode;
                    pq.enqueue(neighbor.node, distance);
                }
            });
        }

        return { distances, previousNodes };
    }

    findShortestPath(startNode, endNode) {
        let { distances, previousNodes } = this.dijkstra(startNode);
        let path = [];
        let currentNode = endNode;

        while (currentNode) {
            path.unshift(currentNode);
            currentNode = previousNodes[currentNode];
        }

        if (distances[endNode] === Infinity) {
            return { distance: Infinity, path: null };
        }

        return { distance: distances[endNode], path };
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority) {
        this.values.push({ value, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    isEmpty() {
        return this.values.length === 0;
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

module.exports = Graph;
