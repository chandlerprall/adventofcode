const input = 'L4, L1, R4, R1, R1, L3, R5, L5, L2, L3, R2, R1, L4, R5, R4, L2, R1, R3, L5, R1, L3, L2, R5, L4, L5, R1, R2, L1, R5, L3, R2, R2, L1, R5, R2, L1, L1, R2, L1, R1, L2, L2, R4, R3, R2, L3, L188, L3, R2, R54, R1, R1, L2, L4, L3, L2, R3, L1, L1, R3, R5, L1, R5, L1, L1, R2, R4, R4, L5, L4, L1, R2, R4, R5, L2, L3, R5, L5, R1, R5, L2, R4, L2, L1, R4, R3, R4, L4, R3, L4, R78, R2, L3, R188, R2, R3, L2, R2, R3, R1, R5, R1, L1, L1, R4, R2, R1, R5, L1, R4, L4, R2, R5, L2, L5, R4, L3, L2, R1, R1, L5, L4, R1, L5, L1, L5, L1, L4, L3, L5, R4, R5, R2, L5, R5, R5, R4, R2, L1, L2, R3, R5, R5, R5, L2, L1, R4, R3, R1, L4, L2, L3, R2, L3, L5, L2, L2, L1, L2, R5, L2, L2, L3, L1, R1, L4, R2, L4, R3, R5, R3, R4, R1, R5, L3, L5, L5, L3, L2, L1, R3, L4, R3, R2, L1, R3, R1, L2, R4, L3, L3, L3, L1, L2';

const directions = ['W', 'N', 'E', 'S'];
const instructions = input.split(/,\s*/);
const position = instructions.reduce(
	(position, instruction) => {
		const turnDir = instruction[0];
		const distance = parseInt(instruction.slice(1), 10);

		// turn
		if (turnDir === 'L') position.dir -= 1;
		if (turnDir === 'R') position.dir += 1;
		if (position.dir < 0) position.dir = directions.length-1;
		if (position.dir === directions.length) position.dir = 0;

		// walk
		switch(position.dir) {
			case 0: // west
				position.x -= distance;
				break;
			case 1: // north
				position.y -= distance;
				break;
			case 2: // east
				position.x += distance;
				break;
			case 3: // south
				position.y += distance;
				break;
		}

		return position;
	},
	{
		x: 0,
		y: 0,
		dir: 1 // north
	}
);

console.log(`Easter Bunny HQ is ${Math.abs(position.x) + Math.abs(position.y)} blocks away.`);