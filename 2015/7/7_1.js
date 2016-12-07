var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var instructions = input.split(/[\r\n]+/g);

function getSignalOf(name) {
    var numerical = parseInt(name, 10);
    var response;
    if (numerical == name) {
        response = numerical;
    } else {
        if (wire_cache.hasOwnProperty(name)) {
            response = wire_cache[name];
        } else {
            wire_cache[name] = response = wires[name]();
        }
    }
    return response;
}

var wires = {};
var wire_cache = {};
var notArray = new Uint16Array(1);
var prepareSource = {
    '->': function(source) {
        return function setcommand() {
            return getSignalOf(source);
        }
    },
    'AND': function andcommand(a, b) {
        return function() {
            return getSignalOf(a) & getSignalOf(b);
        }
    },
    'OR': function orcommand(a, b) {
        return function() {
            return getSignalOf(a) | getSignalOf(b);
        }
    },
    'LSHIFT': function lshiftcommand(a, b) {
        return function() {
            return getSignalOf(a) << getSignalOf(b);
        }
    },
    'RSHIFT': function rshiftcommand(a, b) {
        return function() {
            return getSignalOf(a) >> getSignalOf(b);
        }
    },
    'NOT': function(a) {
        return function notcommand() {
            notArray[0] = ~getSignalOf(a);
            return notArray[0];
        }
    }
};

function prepareInstruction(instruction) {
    var parts = instruction.split(/\s+/g);
    var node_type;
    if (parts[0] === 'NOT') {
        node_type = parts.splice(0, 1)[0];
    } else {
        node_type = parts.splice(1, 1)[0];
    }

    var dest = parts.pop();

    return {
        node_type: node_type,
        dest: dest,
        parts: parts
    }
}

function runInstruction(instruction) {
    var node_type = instruction.node_type;
    var dest = instruction.dest;
    var parts = instruction.parts;

    wires[dest] = prepareSource[node_type].apply(null, parts);
}

instructions
    .map(prepareInstruction)
    .forEach(runInstruction);

console.log(wires.a());