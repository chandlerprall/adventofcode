var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();

var first_basement = -1;
var floor = input.split('').reduce(
    function(floor, char, idx) {
        floor += (char.charCodeAt(0) - 40) * -2 + 1;
        if (floor === first_basement) {
            first_basement = idx + 1;
        }
        return floor;
    },
    0
);

console.log(first_basement);