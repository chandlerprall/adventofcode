var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var directions = input.split('');

var position = {
    x: 0,
    y: 0
};
var deliveries = {};

function makeDelivery() {
    var house = position.x + '-' + position.y;
    if (!deliveries.hasOwnProperty(house)) {
        deliveries[house] = 0;
    }
    deliveries[house] += 1;
}

makeDelivery();
directions.forEach(function(direction) {
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