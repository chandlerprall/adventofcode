var fs = require('fs');

function lookandsay(input) {
    var output = '';
    var current_char;
    var current_times = 0;
    for (var i = 0; i <= input.length; i++) {
        if (i !== input.length) {
            var char = input[i];
            if (current_char == null) {
                current_char = char;
            }
            if (char !== current_char) {
                output += '' + current_times + current_char;
                current_char = char;
                current_times = 1;
            } else {
                current_times++;
            }
        } else {
            output += '' + current_times + current_char;
        }
    }
    return output;
}

var input = '1113222113';
for (var i = 0; i < 40; i++) {
    input = lookandsay(input);
}
console.log(input.length);
