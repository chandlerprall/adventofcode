var md5 = require('md5');
var input = 'bgvyzdsv';

var number = 0;
while(true) {
    var value = input + (number);
    var hash = md5(value);
    if (hash.indexOf('000000') === 0) {
        console.log(number);
        break;
    }
    number++;
}