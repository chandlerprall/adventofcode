var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var lines = input.split(/[\r\n]+/g);

var niceness_rules = [
    function(line) {
        for (var i = 0; i < line.length-1; i++) {
            var char = line[i];
            var neighbor = line[i+1];
            var pair = char + neighbor;

            var next_occurrance = line.indexOf(pair, i+2);
            if (next_occurrance !== -1) {
                return true;
            }
        }
        return false;
    },
    function(line) {
        for (var i = 2; i < line.length; i++) {
            if (line[i-2] === line[i]) {
                return true;
            }
        }
        return false;
    },
];

var nice_lines = lines.reduce(
    function(nice_lines, line) {
        var is_nice = niceness_rules.reduce(
            function(is_nice, rule) {
                var passes_rule = rule(line);
                if (passes_rule === false) {
                    return false;
                } else {
                    return is_nice;
                }
            },
            true
        );
        if (is_nice) {
            nice_lines++;
        }
        return nice_lines;
    },
    0
);
console.log(nice_lines);