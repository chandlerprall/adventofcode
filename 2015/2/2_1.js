var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();

var boxes = input.split(/[\r\n]+/g);
var square_feet_needed = boxes.reduce(
    function(square_feet_needed, box) {
        var dimensions = box.split('x');
        var sides = [
            dimensions[0] * dimensions[1],
            dimensions[0] * dimensions[2],
            dimensions[1] * dimensions[2]
        ];
        var smallest = Math.min.apply(Math, sides);
        return square_feet_needed +
            2 * sides[0] +
            2 * sides[1] +
            2 * sides[2] +
            smallest;
    },
    0
);

console.log(square_feet_needed);