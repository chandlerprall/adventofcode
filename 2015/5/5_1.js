var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var lines = input.split(/[\r\n]+/g);

var niceness_rules = [
    function(line) {
        var vowels = line.match(/([aeiou])/g);
        return vowels != null && vowels.length >= 3;
    },
    function(line) {
        for (var i = 1; i < line.length; i++) {
            if (line[i-1] === line[i]) {
                return true;
            }
        }
        return false;
    },
    function(line) {
        var match = line.match(/(ab|cd|pq|xy)/g);
        return match == null;
    }
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