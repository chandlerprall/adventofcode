var fs = require('fs');
var input = fs.readFileSync('input.txt').toString();
var lines = input.split(/[\r\n]+/g);

var grid = [];
var grid_width = 999;
var grid_height = 999;

function getGridIndex(x, y) {
    return y * grid_width + x;
}

function integerize(str) {
    return parseInt(str, 10);
}

function splitParts(line) {
    return line.split(/\s+/g);
}

function toggleCommand(grid_idx) {
    grid[grid_idx] += 2;
}

function turnCommand(state, grid_idx) {
    if (state === 'on') {
        grid[grid_idx] += 1;
    } else {
        grid[grid_idx] = Math.max(0, grid[grid_idx] - 1);
    }
}

function applyCommand(command, range_start, range_end) {
    var start = range_start.split(',').map(integerize);
    var end = range_end.split(',').map(integerize);

    for (var x = start[0]; x <= end[0]; x++) {
        for (var y = start[1]; y <= end[1]; y++) {
            command(getGridIndex(x, y));
        }
    }
}

function runInstruction(instruction) {
    var command = instruction[0];
    var commandFunction;

    if (command === 'toggle') {
        commandFunction = toggleCommand;
        instruction.shift();
    } else if (command === 'turn') {
        commandFunction = turnCommand.bind(null, instruction[1]);
        instruction.shift();
        instruction.shift();
    }

    applyCommand(commandFunction, instruction[0], instruction[2]);
}

// start with all lights off
for (var i = 0; i <= grid_width; i++) {
    for (var j = 0; j <= grid_height; j++) {
        grid[getGridIndex(i, j)] = 0;
    }
}

lines.map(splitParts).forEach(runInstruction);
var brightness = grid.reduce(
    function(brightness, light) {
        brightness += light;
        return brightness;
    },
    0
);
console.log(brightness);