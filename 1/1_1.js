var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();

var floor = input.split('').reduce(
    function(floor, char) {
        return floor + (char.charCodeAt(0) - 40) * -2 + 1;
    },
    0
);

console.log(floor);