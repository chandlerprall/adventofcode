var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var lines = input.split(/[\r\n]+/g);

function Reindeer(name, speed, flytime, resttime) {
    this.name = name;
    this.speed = speed;
    this.flytime = flytime;
    this.resttime = resttime;

    this.state = 'flying';
    this.time_at_state = 0;
    this.distance_traveled = 0;
}
Reindeer.prototype.update = function() {
    var state_time = this.state === 'resting' ? this.resttime : this.flytime;
    if (this.time_at_state === state_time) {
        this.state = this.state === 'resting' ? 'flying' : 'resting';
        this.time_at_state = 0;
    }

    this.time_at_state++;

    if (this.state === 'flying') {
        this.distance_traveled += this.speed;
    }
};

var reindeer = lines.reduce(
    function(reindeer, line) {
        var parts = line.split(/\s+/g);
        var name = parts[0];
        var speed = parseInt(parts[3], 10);
        var flytime = parseInt(parts[6], 10);
        var resttime = parseInt(parts[13], 10);

        reindeer.push(new Reindeer(name, speed, flytime, resttime));
        return reindeer;
    },
    []
);

var race_length = 2503;
for (var i = 0; i < race_length; i++) {
    reindeer.forEach(function(reindeer) {
        reindeer.update();
    });
}

reindeer.sort(function(a, b) {
    if (a.distance_traveled > b.distance_traveled) {
        return -1;
    } else if (a.distance_traveled < b.distance_traveled) {
        return 1;
    } else {
        return 0;
    }
});

console.log(reindeer[0].distance_traveled);