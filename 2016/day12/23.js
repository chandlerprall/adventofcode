const input = `
cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 13 c
cpy 14 d
inc a
dec d
jnz d -2
dec c
jnz c -5`;

const registers = {a: 0, b: 0, c: 0, d: 0};

const functions = {
	cpy: (cmd) => {
		let [src, dst] = cmd.split(/\s/);

		if (registers.hasOwnProperty(src)) {
			src = registers[src];
		} else {
			src = parseInt(src, 10);
		}
		registers[dst] = src;
	},
	inc: (reg) => {
		registers[reg]++;
	},
	dec: (reg) => {
		registers[reg]--;
	},
	jnz: (cmd) => {
		let [reg, jmp] = cmd.split(/\s/);
		jmp = parseInt(jmp, 10);

		if (registers[reg] !== 0) {
			i += (jmp - 1);
		}
	}
};

const lines = input
.split(/[\r\n]+/)
.filter(x => x);

let i;
for (i = 0; i < lines.length; i++) {
	const line = lines[i];
	const instruction = line.slice(0, 3);
	const command = line.slice(4);
	functions[instruction](command);
}

console.log(registers);