const crypto = require('crypto');
const input = `ugkcyxxp`;

function md5(input) {
	return crypto.createHash('md5').update(input).digest('hex').toString();
}

function writePassword() {
	process.stdout.cursorTo(0, 1);
	process.stdout.write(password.join(' '));
	process.stdout.cursorTo(0, 10);
}

function writeHash(hash) {
	const randomChar = Math.floor(Math.random() * hash.length);
	process.stdout.cursorTo(randomChar, 0);
	process.stdout.write(hash[randomChar]);
	// process.stdout.cursorTo(randomChar, 0);
	process.stdout.cursorTo(0, 10);
}

let i = 0;
let password = ['_', '_', '_', '_', '_', '_', '_', '_'];
let setPositions = {};

process.stdout.cursorTo(0, 0);
process.stdout.clearScreenDown();

writePassword();

while (true) {
	const index = `${input}${i}`;
	const hash = md5(index);

	if (i % 5000 === 0) {
		writeHash(hash);
	}

	if (hash.indexOf('00000') === 0) {
		const position = parseInt(hash[5], 10);
		if (!Number.isNaN(position) && position <= 7 && setPositions[position] == null) {
			password[position] = hash[6];
			setPositions[position] = true;
			writePassword();
			if (Object.keys(setPositions).length === 8) break;
		}
	}

	i++;
}