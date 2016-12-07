var input = 'hepxcrrq';
var min_char_value = 'a'.charCodeAt(0);
var max_char_value = 'z'.charCodeAt(0);

var passwords_reqs = [
    function(password) {
        // Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
        for (var i = 0; i < password.length - 2; i++) {
            var codes = [
                password.charCodeAt(i),
                password.charCodeAt(i+1),
                password.charCodeAt(i+2)
            ];
            if (codes[0] === codes[1] - 1 && codes[0] === codes[2] - 2) {
                return true;
            }
        }

        return false;
    },
    function(password) {
        // Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
        var banned_letters = ['i', 'o', 'l'];
        var is_valid = true;
        banned_letters.forEach(function(banned_letter) {
            if (password.indexOf(banned_letter) !== -1) {
                is_valid = false;
            }
        });
        return is_valid;
    },
    function(password) {
        // Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.
        var letter_pair_count = 0;
        for (var i = 0; i < password.length - 1; i++) {
            if (password[i] === password[i+1]) {
                letter_pair_count++;
                i++; // don't count overlapping pairs
            }
        }
        return letter_pair_count >= 2;
    }
];

function validatePassword(password) {
    return passwords_reqs.reduce(
        function(is_passing, req) {
            if (is_passing === false) {
                return false;
            } else {
                return req(password);
            }
        },
        true
    );
}

function incrementCharacter(password, char_idx) {
    if (char_idx === -1) {
        throw new Error('out of passwords!');
    }
    var char_code = password.charCodeAt(char_idx);
    char_code++;
    if (char_code > max_char_value) {
        char_code = min_char_value;
        password = incrementCharacter(password, char_idx - 1);
    }
    return password.substring(0, char_idx) + String.fromCharCode(char_code) + password.substring(char_idx+1, password.length);
}

function incrementPassword(password) {
    var matches_reqs = false;

    while (matches_reqs === false) {
        password = incrementCharacter(password, 7);
        matches_reqs = validatePassword(password);
    }

    return password;
}

console.log(
    incrementPassword(input)
);