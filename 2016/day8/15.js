const input = `
rect 1x1
rotate row y=0 by 10
rect 1x1
rotate row y=0 by 10
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 4
rect 1x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate row y=1 by 12
rotate row y=0 by 10
rotate column x=0 by 1
rect 9x1
rotate column x=7 by 1
rotate row y=1 by 3
rotate row y=0 by 2
rect 1x2
rotate row y=1 by 3
rotate row y=0 by 1
rect 1x3
rotate column x=35 by 1
rotate column x=5 by 2
rotate row y=2 by 5
rotate row y=1 by 5
rotate row y=0 by 2
rect 1x3
rotate row y=2 by 8
rotate row y=1 by 10
rotate row y=0 by 5
rotate column x=5 by 1
rotate column x=0 by 1
rect 6x1
rotate row y=2 by 7
rotate row y=0 by 5
rotate column x=0 by 1
rect 4x1
rotate column x=40 by 2
rotate row y=2 by 10
rotate row y=0 by 12
rotate column x=5 by 1
rotate column x=0 by 1
rect 9x1
rotate column x=43 by 1
rotate column x=40 by 2
rotate column x=38 by 1
rotate column x=15 by 1
rotate row y=3 by 35
rotate row y=2 by 35
rotate row y=1 by 32
rotate row y=0 by 40
rotate column x=32 by 1
rotate column x=29 by 1
rotate column x=27 by 1
rotate column x=25 by 1
rotate column x=23 by 2
rotate column x=22 by 1
rotate column x=21 by 3
rotate column x=20 by 1
rotate column x=18 by 3
rotate column x=17 by 1
rotate column x=15 by 1
rotate column x=14 by 1
rotate column x=12 by 1
rotate column x=11 by 3
rotate column x=10 by 1
rotate column x=9 by 1
rotate column x=8 by 2
rotate column x=7 by 1
rotate column x=4 by 1
rotate column x=3 by 1
rotate column x=2 by 1
rotate column x=0 by 1
rect 34x1
rotate column x=44 by 1
rotate column x=24 by 1
rotate column x=19 by 1
rotate row y=1 by 8
rotate row y=0 by 10
rotate column x=8 by 1
rotate column x=7 by 1
rotate column x=6 by 1
rotate column x=5 by 2
rotate column x=3 by 1
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 9x1
rotate row y=0 by 40
rotate column x=43 by 1
rotate row y=4 by 10
rotate row y=3 by 10
rotate row y=2 by 5
rotate row y=1 by 10
rotate row y=0 by 15
rotate column x=7 by 2
rotate column x=6 by 3
rotate column x=5 by 2
rotate column x=3 by 2
rotate column x=2 by 4
rotate column x=0 by 2
rect 9x2
rotate row y=3 by 47
rotate row y=0 by 10
rotate column x=42 by 3
rotate column x=39 by 4
rotate column x=34 by 3
rotate column x=32 by 3
rotate column x=29 by 3
rotate column x=22 by 3
rotate column x=19 by 3
rotate column x=14 by 4
rotate column x=4 by 3
rotate row y=4 by 3
rotate row y=3 by 8
rotate row y=1 by 5
rotate column x=2 by 3
rotate column x=1 by 3
rotate column x=0 by 2
rect 3x2
rotate row y=4 by 8
rotate column x=45 by 1
rotate column x=40 by 5
rotate column x=26 by 3
rotate column x=25 by 5
rotate column x=15 by 5
rotate column x=10 by 5
rotate column x=7 by 5
rotate row y=5 by 35
rotate row y=4 by 42
rotate row y=2 by 5
rotate row y=1 by 20
rotate row y=0 by 45
rotate column x=48 by 5
rotate column x=47 by 5
rotate column x=46 by 5
rotate column x=43 by 5
rotate column x=41 by 5
rotate column x=38 by 5
rotate column x=37 by 5
rotate column x=36 by 5
rotate column x=33 by 1
rotate column x=32 by 5
rotate column x=31 by 5
rotate column x=30 by 1
rotate column x=28 by 5
rotate column x=27 by 5
rotate column x=26 by 5
rotate column x=23 by 1
rotate column x=22 by 5
rotate column x=21 by 5
rotate column x=20 by 1
rotate column x=17 by 5
rotate column x=16 by 5
rotate column x=13 by 1
rotate column x=12 by 3
rotate column x=7 by 5
rotate column x=6 by 5
rotate column x=3 by 1
rotate column x=2 by 3
`;

const SCREEN_WIDTH = 50;
const SCREEN_HEIGHT = 6;
let screen = [];

function getPositionFromCoordinates(x, y) {
	return y * SCREEN_WIDTH + x;
}

function getCoordinatesFromPosition(position) {
	return {x: position % SCREEN_WIDTH, y: ~~(position / SCREEN_WIDTH)}
}

function setPixel(screen, x, y, value) {
	screen[getPositionFromCoordinates(x, y)] = value;
}

function getPixel(screen, x, y) {
	return screen[getPositionFromCoordinates(x, y)]
}

for (let x = 0; x < SCREEN_WIDTH; x++) {
	for (let y = 0; y < SCREEN_HEIGHT; y++) {
		setPixel(screen, x, y, 0);
	}
}

const functions = {
	rect: (line) => {
		const [, a, b] = line.match(/(\d+)x(\d+)/);
		for (let x = 0; x < a; x++) {
			for (let y = 0; y < b; y++) {
				setPixel(screen, x, y, 1);
			}
		}
	},
	'rotate column': (line) => {
		let [, col, amt] = line.match(/x=(\d+) by (\d+)/);
		col = parseInt(col, 10);
		amt = parseInt(amt, 10);
		let newScreen = screen.slice();

		for (let y = 0; y < SCREEN_HEIGHT; y++) {
			const destRow = (y + amt) % SCREEN_HEIGHT;
			setPixel(newScreen, col, destRow, getPixel(screen, col, y));
		}

		screen = newScreen;
	},
	'rotate row': (line) => {
		let [, row, amt] = line.match(/y=(\d+) by (\d+)/);
		row = parseInt(row, 10);
		amt = parseInt(amt, 10);
		let newScreen = screen.slice();

		for (let x = 0; x < SCREEN_WIDTH; x++) {
			const destCol = (x + amt) % SCREEN_WIDTH;
			setPixel(newScreen, destCol, row, getPixel(screen, x, row));
		}

		screen = newScreen;
	}
};
const FUNCTION_KEYS = Object.keys(functions);

function printScreen(screen) {
	for (let y = 0; y < SCREEN_HEIGHT; y++) {
		let row = [];
		for (let x = 0; x < SCREEN_WIDTH; x++) {
			row.push(getPixel(screen, x, y));
		}
		console.log(row.join(''));
	}
}

input
.split(/[\r\n]+/)
.filter(x => x)
.forEach(line => {
	const func = functions[FUNCTION_KEYS.filter(f => line.indexOf(f) === 0)[0]];
	func(line);
});

printScreen(screen);

let pixelsOn = 0;
for (let x = 0; x < SCREEN_WIDTH; x++) {
	for (let y = 0; y < SCREEN_HEIGHT; y++) {
		pixelsOn += getPixel(screen, x, y);
	}
}
console.log(pixelsOn);