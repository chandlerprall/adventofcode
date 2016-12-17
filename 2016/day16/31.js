const input = `10011111011011001`;

const DISK_SIZE = 272;
let checksumLength = DISK_SIZE;
while (checksumLength % 2 === 0) checksumLength /= 2;
const checksumDivisions = DISK_SIZE / checksumLength;

function getDistanceFromSplit(index) {
	let split = input.length;
	while (true) {
		const nextSplit = split * 2 + 1;
		if (nextSplit > index) {
			return index - split;
		}
		split = nextSplit;
	}
}

function getDataAt(index) {
	if (input[index] != null) return input[index];

	const distanceFromSplit = getDistanceFromSplit(index);
	if (distanceFromSplit === 0) return '0';

	return getDataAt(index - distanceFromSplit * 2) === '0' ? '1' : '0';
}

let maxDepth = 0;
let maxDepthSetter = checksumDivisions;
while (maxDepthSetter !== 1) {
	maxDepth++;
	maxDepthSetter = maxDepthSetter >> 1;
}

function getChecksumAt(index, depth = 0) {
	let a;
	let b;
	if (depth === maxDepth) {
		return getDataAt(index);
	} else {
		a = getChecksumAt(index * 2, depth + 1);
		b = getChecksumAt(index * 2 + 1, depth + 1);
	}
	return a === b ? '1' : '0';
}

let checksum = '';
for (let i = 0; i < checksumLength; i++) {
	checksum += getChecksumAt(i);
}
console.log(checksum);