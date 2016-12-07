var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var lines = input.split(/[\r\n]+/g);

function expandLine(line) {
    var new_line = '';
    for (var i = 0; i < line.length; i++) {
        var char = line[i];
        if (char === '"') {
            new_line += '\\';
        }

        if (char === '\\') {
            new_line += '\\';
        }

        new_line += char;
    }
    return '"' + new_line + '"';
}

var lengths = lines.reduce(
    function(lengths, line) {
        lengths.code += line.length;
        lengths.new_code += expandLine(line).length;
        return lengths;
    },
    {
        code: 0,
        new_code: 0
    }
);

console.log(lengths.new_code - lengths.code);