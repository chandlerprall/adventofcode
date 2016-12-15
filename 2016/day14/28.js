const crypto = require('crypto');

function md5(input) {
	return crypto.createHash('md5').update(input).digest('hex').toString().replace(/-/g, '');
}

function getHash(input) {
	let hash = md5(input);
	for (let i = 0; i < 2016; i++) hash = md5(hash);
	return hash;
}

function getRepeatingCharacter(key, minimumRepeats, testAgainst) {
	let charView = [];
	for (let i = 0; i < key.length; i++) {
		charView.push(key[i]);
		if (charView.length === minimumRepeats) {
			let charsAreTheSame = true;
			for (let j = 0; j < minimumRepeats - 1; j++) {
				if (charView[j] !== charView[j + 1]) {
					charsAreTheSame = false;
				}
			}
			if (charsAreTheSame && (testAgainst == null || testAgainst === charView[0])) return charView[0];
			charView.shift();
		}
	}
	return false;
}

const input = `cuanljph`;

let repeatsThree = {};
let validKeys = [];

let hashTesting = [];

let i = 0;
while(true) {
	let hash = getHash(`${input}${i}`);
	hashTesting.push(hash);
	
	let repeatedChar = getRepeatingCharacter(hash, 3);
	if (repeatedChar) {
		repeatsThree[hash] = repeatedChar;
	}
	
	let hashToTest = hashTesting[i - 1001];
	if (hashToTest != null) {
		if (repeatsThree.hasOwnProperty(hashToTest)) {
			let hasFiver = false;
			for (let j = i - 1000; j < i; j++) {
				if (repeatsThree.hasOwnProperty(hashTesting[j])) {
					if (getRepeatingCharacter(hashTesting[j], 5, repeatsThree[hashToTest])) {
						hasFiver = true;
						break;
					}
				}
			}
			if (hasFiver) {
				validKeys.push(hashToTest);
				if (validKeys.length === 64) {
					console.log(i - 1001);
					process.exit();
				}
			}
		}
	}
	
	i++;
}