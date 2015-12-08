var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var lines = input.split(/[\r\n]+/g);

var lengths = lines.reduce(
    function(lengths, line) {
        lengths.code += line.length;
        lengths.memory += eval(line).length;
        return lengths;
    },
    {
        code: 0,
        memory: 0
    }
);

console.log(lengths.code - lengths.memory);