var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();

var directions = input.split('');
var start_position = [
    {x: 0, y: 0},
    {x: 0, y: 0}
];

function getDeliveryCoordinates(mod) {
    return function(direction, idx) {
        var position = this[idx % 2];
        if ( direction === '<' ) {
            position.x -= 1;
        } else if ( direction === '>' ) {
            position.x += 1;
        } else if ( direction === '^' ) {
            position.y -= 1;
        } else if ( direction === 'v' ) {
            position.y += 1;
        }
        return position.x + '-' + position.y;
    }
}

function uniques(uniques, entry) {
    if (uniques.indexOf(entry) === -1) {
        uniques.push(entry);
    }
    return uniques;
}

var unique_locations = directions
    .map(getDeliveryCoordinates(0), start_position)
    .reduce(uniques, []);

console.log(unique_locations.length);