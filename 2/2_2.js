var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();

var boxes = input.split(/[\r\n]+/g);
var ribbon_needed = boxes.reduce(
    function(ribbon_needed, box) {
        var dimensions = box.split('x').map(function(dimension) {
            return parseInt(dimension, 10);
        });
        dimensions.sort(function(a, b) {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }
            else {
                return 0;
            }
        });

        var cubic_feet = dimensions[0] * dimensions[1] * dimensions[2];

        return ribbon_needed +
            2 * dimensions[0] +
            2 * dimensions[1] +
            cubic_feet;
    },
    0
);

console.log(ribbon_needed);