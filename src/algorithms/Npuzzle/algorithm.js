import PriorityQueue from "../../helpers/Npuzzle/PriorityQueue";

const displayMessage = (m) => {
	alert(m);
};

const goalStateString = (puzzleData) => {
	let arr = Array(puzzleData.snail.length);
	for (let i = 0; i < arr.length - 1; i++) {
		arr[puzzleData.snail[i]] = i + 1;
	}
	arr[puzzleData.snail[puzzleData.snail.length - 1]] = 0;
	return arr.toString();
};


const accessibleStates = (curState, size, weight, heuristic, snail) => {
	//TODO(opti): computeCost => updateCost
	//TODO:plutot que de la passer en pointeur, la fonction computeCost devrait etre dans l'objet solver
	let ret = [];
	let dir = [1, -1, size, -size];

	for (let i = 0; i < dir.length; i++) {
		let d = dir[i];
		let newIdx = curState.idxZero + d;

		let x_cur_zero = curState.idxZero % size;
		let y_cur_zero = Math.floor(curState.idxZero / size);
		let x_new_zero = newIdx % size;
		let y_new_zero = Math.floor(newIdx / size);

		if (!(newIdx < 0 || newIdx >= curState.arr.length
			|| (x_cur_zero !== x_new_zero && y_cur_zero !== y_new_zero))) {

			let newStep = curState.step + 1;
			let newArr = [...curState.arr];
			newArr[curState.idxZero] = newArr[curState.idxZero + d];
			newArr[curState.idxZero + d] = 0;
			const newState = {
				arr:newArr,
				idxZero: curState.idxZero + d,
				cost: newStep + weight * heuristic(newArr, size, snail),
				step: newStep,
				previousState: curState,
			};
			ret.push(newState);
		}
	}
	return ret;
};

//TODO : comparer performances avec differentes versions de computeManhattanDistance
//TODO : get old manhattan distance and check if it goes up or down

export const computeManhattanDistance = (arr, size, snail) => {
	let dist = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === 0) continue;
		const x_current = i % size;
		const y_current = Math.floor(i / size);
		const x_goal = snail[arr[i] - 1] % size;
		const y_goal = Math.floor(snail[arr[i] - 1] / size);
		dist += Math.abs(y_current - y_goal) + Math.abs(x_current - x_goal);
	}
	return dist;
}

export const computeLinearConflicts = (arr, size, snail) => {
	let conflicts = 0;
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] === 0) continue;
		const goalX = snail[arr[i] - 1] % size;
		const goalY = Math.floor(snail[arr[i] - 1] / size);
		const x = i % size;
		const y = Math.floor(i / size);
		if (x === goalX) {
			for (let xx = x + 1; xx < size; xx++) {
				const goalXX = snail[arr[y * size + xx]] % size;
				if (goalXX === goalX) conflicts++;
			}
		}
		if (y === goalY) {
			for (let yy = y + 1; yy < size; yy++) {
				const goalYY = Math.floor(snail[arr[yy * size + x]] / size);
				if (goalYY === goalY) conflicts++;
			}
		}
	}
	return ((conflicts * 2) + computeManhattanDistance(arr, size, snail));
};

export const solve = (puzzleData) => {
	/*//TODO
	let max_size = 0;
	let n_iter = 0;
	*/

	let openSet = new PriorityQueue();
	let alreadyAccessedStates = {};
	let initialState = {
		arr: puzzleData.arr,
		cost: puzzleData.heuristic(puzzleData.arr, puzzleData.size, puzzleData.snail),
		idxZero: puzzleData.arr.indexOf(0),
		step: 0,
		previousState: null
	};

	alreadyAccessedStates[initialState.arr.toString()] = initialState.cost;

	if (puzzleData.idxZero === -1) {
		displayMessage("Error: no zero found in the puzzle");
		return;
	}

	const goalState = goalStateString(puzzleData);
	if (initialState.arr.toString() === goalState) {
		displayMessage("This is already the solution state");
		return;
	}

	const accessibleStatesFromInitial = accessibleStates(initialState, puzzleData.size, puzzleData.weight, puzzleData.heuristic, puzzleData.snail);
	for (let i = 0; i < accessibleStatesFromInitial.length; i++) {
		if (accessibleStatesFromInitial[i].arr.toString() === goalState) {
			return foundSolution(accessibleStatesFromInitial[i]);
		}
		openSet.enqueue(accessibleStatesFromInitial[i], accessibleStatesFromInitial[i].cost);
	}

	while (!openSet.isEmpty()) {
		let state = openSet.dequeue();
		let nextStates = accessibleStates(state.content, puzzleData.size, puzzleData.weight, puzzleData.heuristic, puzzleData.snail);

		for (let i = 0; i < nextStates.length; i++) {
			let accessibleState = nextStates[i];
			if (accessibleState.arr.toString() === goalState) {
				return foundSolution(accessibleState);
			}
			if (!alreadyAccessedStates[accessibleState.arr.toString()]) {
				//TODO:  si v existe dans closedList (devrait etre bon) ou si v existe dans openList avec un cout inférieur (pas bon..)
				alreadyAccessedStates[accessibleState.arr.toString()] = accessibleState.cost;
				openSet.enqueue(accessibleState, accessibleState.cost);
			}
		}
	}
	displayMessage("There is no solution to this puzzle");
};

const retrievePath = (finalState) => {
	console.log(finalState);
	let path = [];
	let curState = finalState;
	while (curState != null) {
		path.unshift(curState.arr);
		curState = curState.previousState;
	}
	console.log(path);
};

const foundSolution = (solutionState) => {
	displayMessage("Found solution on step " + solutionState.step);
	retrievePath(solutionState);
	return 0;
};