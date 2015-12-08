var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();

var directions = input.split('');
var start_position = {x: 0, y: 0};

function getDeliveryCoordinates(direction) {
    if (direction === '<') {
        this.x -= 1;
    } else if (direction === '>') {
        this.x += 1;
    } else if (direction === '^') {
        this.y -= 1;
    } else if (direction === 'v') {
        this.y += 1;
    }
    return this.x + '-' + this.y;
}

function uniques(uniques, entry) {
    if (uniques.indexOf(entry) === -1) {
        uniques.push(entry);
    }
    return uniques;
}

var unique_locations = directions
    .map(getDeliveryCoordinates, start_position)
    .reduce(uniques, ['0-0']);

console.log(unique_locations.length);