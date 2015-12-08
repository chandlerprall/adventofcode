var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var directions = input.split('');

var santa_position = {
    x: 0,
    y: 0
};
var robo_position = {
    x: 0,
    y: 0
};
var deliveries = {};

function makeDelivery() {
    var house = santa_position.x + '-' + santa_position.y;
    if (!deliveries.hasOwnProperty(house)) {
        deliveries[house] = 0;
    }
    deliveries[house] += 1;

    var house = robo_position.x + '-' + robo_position.y;
    if (!deliveries.hasOwnProperty(house)) {
        deliveries[house] = 0;
    }
    deliveries[house] += 1;
}

makeDelivery();
directions.forEach(function(direction, idx) {
    var position = idx % 2 === 0 ? santa_position : robo_position;

    if (direction === '<') {
        position.x -= 1;
    } else if (direction === '>') {
        position.x += 1;
    } else if (direction === '^') {
        position.y -= 1;
    } else if (direction === 'v') {
        position.y += 1;
    }

    makeDelivery();
});

console.log(Object.keys(deliveries).length);