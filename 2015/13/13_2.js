var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var lines = input.split(/[\r\n]+/g);

function Person(name) {
    this.name = name;
    this.considerations = {};
}
Person.prototype.consider = function(name, points) {
    this.considerations[name] = points;
};

var people = lines.reduce(
    function(people, line) {
        var parts = line.split(/\s+/g);
        var name1 = parts[0];
        var name2 = parts[10].replace('.', '');
        var points = (parts[2] === 'gain' ? 1 : -1) * parseInt(parts[3], 10);

            var person = people[name1] || new Person(name1);
        person.consider(name2, points);
        people[name1] = person;

        return people;
    },
    {}
);

function createArrangements(existing_arrangement, seat_idx) {
    for (var i = 0; i < all_names.length; i++) {
        var name = all_names[i];
        if (existing_arrangement.indexOf(name) === -1) {
            var arrangement = existing_arrangement.slice();
            arrangement.push(name);

            if (seat_idx === all_names.length - 1) {
                arrangements.push(arrangement);
            } else {
                createArrangements(arrangement, seat_idx + 1);
            }
        }
    }
}

// inject myself
people['Chandler'] = new Person('Chandler');

var arrangements = [];
var all_names = Object.keys(people);
createArrangements([], 0);

var most_happiness = arrangements.reduce(
    function(most_happiness, arrangement) {
        var happiness = 0;
        arrangement.forEach(function(name, idx) {
            var prev_idx = idx === 0 ? arrangement.length-1 : idx - 1;
            var prev = arrangement[prev_idx];
            var next_idx = idx === arrangement.length-1 ? 0 : idx + 1;
            var next = arrangement[next_idx];

            var person = people[name];
            happiness += (person.considerations[prev] || 0) + (person.considerations[next] || 0);
        });

        return Math.max(most_happiness, happiness);
    },
    -Infinity
);
console.log(most_happiness);