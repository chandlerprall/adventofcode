var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var lines = input.split(/[\r\n]+/g);

function City(name) {
    this.name = name;
    this.neighbors = [];
}
City.prototype.addNeighbor = function(city, distance) {
    this.neighbors.push({
        city: city,
        distance: distance
    });
};

// create graph
var cities = {};
lines.forEach((route) => {
    var values = route.split(/\s+/g);
    var city1 = values[0];
    var city2 = values[2];
    var distance = parseFloat(values[4], 10);

    if (!cities.hasOwnProperty(city1)) {
        cities[city1] = new City(city1);
    }
    if (!cities.hasOwnProperty(city2)) {
        cities[city2] = new City(city2);
    }

    cities[city1].addNeighbor(cities[city2], distance);
    cities[city2].addNeighbor(cities[city1], distance);
});

// travel that salesman
var scores = [];
function visit(distance_travelled, city, history) {
    history = Object.assign({}, history);
    history[city.name] = true;
    var visited_neighbors = 0;
    city.neighbors.forEach((neighbor) => {
        if (!history.hasOwnProperty(neighbor.city.name)) {
            visited_neighbors++;
            visit( distance_travelled + neighbor.distance, neighbor.city, history );
        }
    });

    if (visited_neighbors === 0) {
        scores.push(distance_travelled);
    }
}

Object.keys(cities).forEach((cityName) => {
    visit(
        0,
        cities[cityName],
        {}
    );
});

scores.sort((a, b) => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
});
console.log(scores[scores.length-1]);