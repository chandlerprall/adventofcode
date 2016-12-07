const crypto = require('crypto');
const input = `ugkcyxxp`;

function md5(input) {
	return crypto.createHash('md5').update(input).digest('hex').toString();
}

let i = 0;
let password = [];
while (true) {
	const index = `${input}${i}`;
	const hash = md5(index);

	if (hash.indexOf('00000') === 0) {
		password.push(hash[5]);
		if (password.length === 8) break;
	}

	i++;
}

console.log(password.join(''));