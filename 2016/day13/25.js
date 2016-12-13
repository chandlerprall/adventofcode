const input = 1362;

const [WIDTH, HEIGHT] = process.stdout.getWindowSize();

function coordinatesToIndex(x, y) {
	return x + y * WIDTH;
}

function indexToCoordinates(idx) {
	return {x: idx % WIDTH, y: ~~(idx / WIDTH)};
}

const map = [];
function printMap() {
	for (let y = 0; y < HEIGHT; y++) {
		let row = [];
		for (let x = 0; x < WIDTH; x++) {
			row.push(map[coordinatesToIndex(x, y)]);
		}
		process.stdout.cursorTo(0, y);
		process.stdout.write(row.join(''));
	}
}

function isWall(x, y) {
	let value = x*x + 3*x + 2*x*y + y + y*y + input;
	let numSetBits = 0;
	
	while (value > 0) {
		numSetBits += value & 1;
		value = value >> 1;
	}
	
	return numSetBits % 2 !== 0;
}

for (let x = 0; x < WIDTH; x++) {
	for (let y = 0; y < HEIGHT; y++) {
		map[coordinatesToIndex(x, y)] = ' ';
	}
}

let queue = [{x: 1, y: 1, steps: 0}];
let history = {};

function queueStep({x, y, steps}) {
	if (x >= 0 && y >= 0) {
		const key = `${x}-${y}`;
		if (!history.hasOwnProperty(key)) {
			history[key] = true;
			map[coordinatesToIndex(x, y)] = isWall(x, y) ? '#': '.';
			if (!isWall(x, y)) {
				queue.push({x, y, steps});
			}
		}
	}
}

function processQueue() {
	const {x, y, steps} = queue.shift();
	
	if (x === 31 && y === 39) {
		printMap();
		console.log(steps);
		process.exit();
	}
	
	queueStep({x: x, y: y - 1, steps: steps + 1});
	queueStep({x: x, y: y + 1, steps: steps + 1});
	queueStep({x: x - 1, y, steps: steps + 1});
	queueStep({x: x + 1, y, steps: steps + 1});
	printMap();
	
	if (queue.length > 0) {
		setTimeout(processQueue, 10);
	}
}
processQueue();