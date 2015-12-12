var input = require('./input.json');

var sum = 0;

function hasRed(obj) {
    var has_red = false;

    Object.keys(obj).forEach(function(key) {
        if (obj[key] === 'red') {
            has_red = true;
        }
    });

    return has_red;
}

function traverse(obj) {
    Object.keys(obj).forEach(function(key) {
        var value = obj[key];

        if (typeof value === 'number') {
            sum += value;
        } else if (value instanceof Array) {
            traverse(value);
        } else if (typeof value === 'object') {
            if (!hasRed(value)) {
                traverse(value);
            }
        }
    });
}

traverse(input);
console.log(sum);