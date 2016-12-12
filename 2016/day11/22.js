const input = `
The first floor contains a elerium generator, a elerium-compatible microchip, a dilithium generator, and a dilithium-compatible microchip.
The second floor contains nothing relevant.
The third floor contains nothing relevant.
The fourth floor contains a thulium-compatible microchip a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, a curium-compatible microchip, a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.`;

const floors = [];

input
.split(/[\r\n]+/)
.filter(x => x)
.forEach((line, floorIdx) => {
	const contents = (line
	.match(/(\S+) (microchip|generator)/g) || [])
	.map(content => {
		let object = {};
		if (content.indexOf('generator') !== -1) {
			object.type = 'generator';
			object.name = content.split(/\s/)[0];
		} else {
			object.type = 'microchip';
			object.name = content.split('-')[0];
		}
		return object;
	});
	floors[floorIdx] = contents;
});

let configurations = [{playerFloor: 3, floors, history: 0}];

function hashConfiguration({playerFloor, floors}) {
	const floorsHash = floors.reduce(
		(floorsHash, floor, floorIdx) => {
			const sortedItems = floor.sort((a, b) => {
				if (a.type < b.type) return -1;
				if (a.type > b.type) return 1;

				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;

				return 0;
			}).map(({type, name}) => `${type}-${name}`);
			return floorsHash.concat([`floor${floorIdx}`, ...sortedItems])
		},
		[]
	);
	return `${playerFloor}-${floorsHash.join(':')}`;
}

function queueConfiguration(configuration) {
	// verify configuration is valid
	if (!isConfigurationValid(configuration)) return;

	// make sure we haven't been in this state yet
	const currentStateHash = hashConfiguration(configuration);
	const seenConfigurationBefore = globalHistory.hasOwnProperty(currentStateHash);
	if (seenConfigurationBefore) {
		return;
	}

	globalHistory[currentStateHash] = configuration;
	configurations.push(configuration);
}

let totalSearches = 0;
let globalHistory = {};
while (configurations.length > 0) {
	const configuration = configurations.shift();
	const {playerFloor, floors, history} = configuration;

	// is this configuration final?
	totalSearches++;
	if (floors[0].length === 0 && floors[1].length === 0 && floors[2].length === 0) {
		console.log(history); // + 37 ?
		process.exit();
	}

	// player can take 1 or 2 items from current floor
	const floorItems = floors[playerFloor];
	const itemCombinations = makeCombinations(floorItems);

	itemCombinations.forEach(combination => {
		// take combination up a floor
		if (playerFloor < 3) {
			queueConfiguration(moveItems(configuration, playerFloor, playerFloor + 1, combination));
		}

		// take combination up a floor
		if (playerFloor > 0) {
			queueConfiguration(moveItems(configuration, playerFloor, playerFloor - 1, combination));
		}
	});
}

function isConfigurationValid({floors}) {
	return floors.reduce(
		(isConfigurationValid, floor) => {
			if (isConfigurationValid === false) return isConfigurationValid;

			let floorGenerators = [];
			let floorMicrochips = [];

			floor.forEach(({type, name}) => {
				(type === 'generator' ? floorGenerators : floorMicrochips).push(name);
			});

			if (floorGenerators.length === 0) return true; // if the floor only has microchips, everything is fine

			const hasUnpoweredMicrochip = floorMicrochips.reduce(
				(hasUnpoweredMicrochip, microchip) => {
					if (hasUnpoweredMicrochip === true) return hasUnpoweredMicrochip;
					return floorGenerators.indexOf(microchip) === -1;
				},
				false
			);
			return hasUnpoweredMicrochip === false;
		},
		true
	)
}

function moveItems(configuration, fromFloor, toFloor, items) {
	let newFloors = JSON.parse(JSON.stringify(configuration.floors));
	newFloors[toFloor] = newFloors[toFloor].concat(items);

	const itemHashes = items.map(({type,name}) => `${type}-${name}`);
	newFloors[fromFloor] = newFloors[fromFloor].filter(existingItem => {
		const existingHash = `${existingItem.type}-${existingItem.name}`;
		return itemHashes.indexOf(existingHash) === -1;
	});

	return {
		playerFloor: toFloor,
		history: configuration.history + 1,
		floors: newFloors
	};
}

function makeCombinations(array, combination = [], startIdx = 0) {
	let combinations = [];
	array.slice(startIdx).forEach((item, itemIdx) => {
		let newCombination = combination.slice(); // copy input array
		newCombination.push(item);

		if (newCombination.length === 2) {
			const isBothSameType = newCombination[0].type === newCombination[1].type;
			const isBothSameCompat = newCombination[0].name === newCombination[1].name;
			if (isBothSameType || isBothSameCompat) {
				combinations.push(newCombination);
			}
		} else {
			combinations.push(newCombination);
			combinations = combinations.concat(makeCombinations(array, newCombination, itemIdx + 1));
		}
	});
	return combinations.sort((a, b) => {
		if (a.length === 2 && b.length === 2) {
			const isASameStuff = a[0].name === a[1].name;
			const isBSameStuff = b[0].name === b[1].name;
			if (isASameStuff && !isBSameStuff) {
				return -1;
			} else if (!isASameStuff && isBSameStuff) {
				return 1;
			}
		}

		if (a.length > b.length) return -1;
		if (a.length < b.length) return 1;
		return 0;
	});
}