//defining our graph
/*here ‘start’, A, B, C, D represent our nodes, ‘start’ will be our starting node and the numbers represent the cost to the next node*/
const graph = {
    start: {A: 5, B: 2},
    A: {C: 4, D: 2},
    B: {A: 8, D: 7},
    C: {D: 6, end: 3},
    D: {end: 1},
    end: {}
};


//Now we define our function for Dijkstra’s Algorithm
function dijkstraAlg(graph) {
    const costs = Object.assign({end: Infinity}, graph.start);
    const parents = {end: null};
    const processed = [];

    let node = findLowestCostNode(costs, processed);

    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            let newCost = cost + children[n];
            if (!costs[n] || costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        }
        processed.push(node);
        node = findLowestCostNode(costs, processed);
    }

    let optimalPath = ['end'];
    let parent = parents.end;
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    return {distance: costs.end, path: optimalPath};
};

function findLowestCostNode(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};
//We can now call the function with our graph as follows:
console.log(dijkstraAlg(graph));
