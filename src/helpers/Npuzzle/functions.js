
export const shuffle = (a) => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};

export const generateRandomArray = (size) => (
	shuffle([...Array(size * size).keys()])
);

export const computeSnailIteration = (size) => {
	if (size < 2) return [];
	let directionalMoves = [1, size, -1, size * -1];
	let cur_i = 0;
	let directionIdx = 0;
	let n_moves = size - 1;
	let beforeDecrementMoves = 3;
	let idxArr = [0];

	while (n_moves) {
		while (beforeDecrementMoves) {
			for (let movesThisDirection = n_moves; movesThisDirection > 0; movesThisDirection--) {
				cur_i += directionalMoves[directionIdx];
				idxArr.push(cur_i);
			}
			directionIdx = (directionIdx + 1) % 4;
			beforeDecrementMoves--;
		}
		n_moves--;
		beforeDecrementMoves = 2;
	}
	return idxArr;
};

export const countInversions = (arr, snail) => {
	//works, but is SLOW
	let inversions = 0;
	let prevValues = [];

	for (let i = 0; i < arr.length; i++) {
		if (arr[snail[i]] !== 0) {
			for (let j = 0; j < prevValues.length; j++) {
				if (arr[snail[i]] < prevValues[j]) {
					inversions++;
				}
			}
		}
		prevValues.push(arr[snail[i]]);
	}
	return inversions;
};