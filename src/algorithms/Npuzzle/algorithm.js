import PriorityQueue from '../../helpers/Npuzzle/PriorityQueue';
import doTestsPriorityQueue from '../../tests/helpers/NPuzzle/PriorityQueue.test';
import doTestsLinearConflicts from '../../tests/algorithms/Npuzzle/algorithm.test';

/*
The user must be able to choose between at LEAST 3 (relevant) heuristic functions.

• At the end of the search, the program has to provide the following values:
◦ Total number of states ever selected in the "opened" set (complexity in time)
◦ Maximum number of states ever represented in memory at the same time
during the search (complexity in size)
◦ Number of moves required to transition from the initial state to the final state,
	according to the search
◦ The ordered sequence of states that make up the solution, according to the
search
◦ The puzzle may be unsolvable, in which case you have to inform the user and
exit

Output correctness
The students have the output required by the subject, which is:
	- Complexity in time
	- Complexity in size
	- Number of moves from initial state to solution
	- Ordered sequence of states that make up the solution

*/

const displayMessage = (m) => {
	alert(m);
};

const computeGoalState = (snail) => {
	let arr = Array(snail.length);
	for (let i = 0; i < snail.length - 1; i++) {
		arr[snail[i]] = i + 1;
	}
	arr[snail[snail.length - 1]] = 0;
	return arr;
}

const goalStateString = (puzzleData) => {
	return computeGoalState(puzzleData.snail).toString();
};


const accessibleStates = (curState, size, weight, heuristic, snail) => {
	//TODO(opti): computeCost => updateCost
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
			for (let yy = y + 1; yy < size; yy++) {
				if (snail[arr[yy * size + x]] === 0) continue;
				const goalXX = snail[arr[yy * size + x] - 1] % size;
				const goalYY = Math.floor(snail[arr[yy * size + x] - 1] / size);
				if (yy > y && goalX === goalXX && goalYY < goalY) {
					conflicts++;
				}
			}
		}
		if (y === goalY) { 
			for (let xx = x + 1; xx < size; xx++) {
				if (snail[arr[y * size + xx]] === 0) continue;
				const goalXX = snail[arr[y * size + xx] - 1] % size;
				const goalYY = Math.floor(snail[arr[y * size + xx] - 1] / size);
				if (xx > x && goalY === goalYY && goalXX < goalX) {
					conflicts++;
				}
			}
		}
	}
	return ((conflicts * 2) + computeManhattanDistance(arr, size, snail));
};

/*
While any tile is out of its goal position do
	If the blank is in its own goal position,
		then swap with any misplaced tile
else swap with the tile that belongs in the blank's position 
*/

export const computeRelaxedAdjacency = (arr, size, snail) => {
	let ret = 0;
	let idxZero = arr.indexOf(0); 
	let fakeArr = [...arr];
	let misplaced = [];
	for (let i = 0; i < fakeArr.length; i++) {
		if (fakeArr[i] === 0) continue;
		if (snail[fakeArr[i] - 1] !== i) {
			misplaced.push(i);
		}
	}
	while (misplaced.length > 0) {
		if (idxZero === snail[fakeArr[fakeArr.length - 1]]) {
			let misplacedElem = misplaced.pop();
			fakeArr[idxZero] = fakeArr[misplacedElem];
			fakeArr[misplacedElem] = 0;
			idxZero = misplacedElem;
		}
		else {
			let goalArr = computeGoalState(snail);
			//je veux goalState[idxZero]
			//goalState[snail[i]] = i + 1; 
			let elemToMove = snail.indexOf(fakeArr[idxZero]);		
			misplaced.splice(elemToMove, 1);


				/*
	for (let i = 0; i < arr.length - 1; i++) {
		arr[puzzleData.snail[i]] = i + 1;
	}
	arr[puzzleData.snail[puzzleData.snail.length - 1]] = 0;
	*/

			//			fakeArr[elemToMove] = 
			idxZero = elemToMove; 
			
		}
		ret++;
	}
	return ret;
}

export const solve = (puzzleData) => {
	/*//TODO
	let max_size = 0;
	let n_iter = 0;
	*/
	let [arr, size, snail, heuristic, weight] = [puzzleData.arr, puzzleData.size, puzzleData.snail, puzzleData.heuristic, puzzleData.weight];

	let openSet = new PriorityQueue();
	let alreadyAccessedStates = {};
	let initialState = {
		arr: arr,
		cost: heuristic(arr, size, snail),
		idxZero: arr.indexOf(0),
		step: 0,
		previousState: null
	};

	alreadyAccessedStates[initialState.arr.toString()] = initialState.cost;
	const goalState = goalStateString(puzzleData);
	if (initialState.arr.toString() === goalState) {
		displayMessage("This is already the solution state");
		return;
	}

	const accessibleStatesFromInitial = accessibleStates(initialState, size, weight, heuristic, snail);
	for (let i = 0; i < accessibleStatesFromInitial.length; i++) {
		if (accessibleStatesFromInitial[i].arr.toString() === goalState) {
			return foundSolution(accessibleStatesFromInitial[i]);
		}
		openSet.enqueue(accessibleStatesFromInitial[i], accessibleStatesFromInitial[i].cost);
	}

	while (!openSet.isEmpty()) {
		let state = openSet.dequeue();
		let nextStates = accessibleStates(state.content, size, weight, heuristic, snail);

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
	return path;
};

const foundSolution = (solutionState) => {
	displayMessage("Found solution on step " + solutionState.step);
	return retrievePath(solutionState);
};

doTestsPriorityQueue();
doTestsLinearConflicts();
