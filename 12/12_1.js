var input = require('./input.json');

var sum = 0;

function traverse(obj) {
    Object.keys(obj).forEach(function(key) {
        var value = obj[key];
        if (typeof value === 'number') {
            sum += value;
        } else if (typeof value === 'object') {
            traverse(value);
        }
    });
}

traverse(input);
console.log(sum);