import PriorityQueue from '../../helpers/Npuzzle/PriorityQueue';
import doTestsPriorityQueue from '../../tests/helpers/Npuzzle/PriorityQueue.test';
import doTestsLinearConflicts from '../../tests/algorithms/Npuzzle/algorithm.test';
import {THRESHOLD_SIZE_COMPLEXITY} from '../../helpers/Npuzzle/defines';
/*
 * Test the program on some puzzles, some from the students (the subject requires that they bring some) and some using the generator in the subject.

The students have implemented an option to do a greedy search and are able to explain it.
The students have implemented an option to do a uniform-cost search and are able to explain it.


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
};

const goalStateString = (puzzleData) => {
	return computeGoalState(puzzleData.snail).toString();
};

const logTime = (runInfo) => {
	runInfo.time = (Date.now() - runInfo.time) / 1000;
	console.log("Time to find the solution: " + runInfo.time + "s");
};

const isInClosedSetOrLowerCostInOpenSet = (stringArr, cost, closedSet, openSetContent) => {
	return (closedSet[stringArr] || (openSetContent[stringArr] < cost));
};

const retrievePath = (finalState) => {
	//	console.log(finalState);
	let path = [];
	let curState = finalState;
	while (curState != null) {
		path.unshift(curState.arr);
		curState = curState.previousState;
	}
	return path;
};

const foundSolution = (solutionState, runInfo) => {
	if (runInfo.purgeStep > 0) {
		displayMessage("Found solution on step " + Number(Number(runInfo.purgeStep) + Number(solutionState.step)));
		
		//let nextSolutionPath = runInfo.solutionPath.concat(retrievePath(nextState));
		console.log(runInfo);
		return runInfo.solutionPath.concat(retrievePath(solutionState));
	}
	else {
		displayMessage("Found solution on step " + solutionState.step);
		console.log(runInfo);
		return retrievePath(solutionState);
	}
};

const accessibleStates = (curState, size, weight, heuristic, snail) => {
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

			let newArr = [...curState.arr];
			newArr[curState.idxZero] = newArr[curState.idxZero + d];
			newArr[curState.idxZero + d] = 0;
			
			/* updateLinearConflicts
			//TODO(opti): computeCost => updateCost
			let newCost = curState.cost + 1 + weight * updateLinearConflicts(
				curState.arr,
				newArr,
				size,
				snail,
				{x: x_new_zero, y: y_new_zero},
				{x: x_cur_zero, y: y_cur_zero},
				{x: snail[newArr[curState.idxZero] - 1] % size, y: Math.floor(snail[newArr[curState.idxZero] - 1])});
			
			const newState = {
				arr:newArr,
				idxZero: curState.idxZero + d,
				cost: newCost,
				step: curState.step + 1,
				previousState: curState,
			};

				//updateManhattan qui fonctionne
			let newCost = curState.cost + 1 + weight * updateManhattan(
				{x: x_new_zero, y: y_new_zero},
				{x: x_cur_zero, y: y_cur_zero},
				{x: snail[newArr[curState.idxZero] - 1] % size, y: Math.floor(snail[newArr[curState.idxZero] - 1])});
			const newState = {
				arr:newArr,
				idxZero: curState.idxZero + d,
				cost: newCost,
				step: curState.step + 1,
				previousState: curState,
			};
			*/

			let newStep = curState.step + 1;
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


export const updateManhattanDistance = (current, previous, goal) => {
	return (Math.abs(previous.y - goal.y) + Math.abs(previous.x - goal.x))
			- (Math.abs(current.y - goal.y) + Math.abs(current.x - goal.x));
}

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

export const updateLinearConflicts = (oldArr, newArr, size, snail, current, previous, goal) => {
	// oldArr / newArr ne devrait changer strictement rien je crois
	let oldConflicts = 0;
	let newConflicts = 0;
	
	//la ligne sur laquelle la case bouge ne peut pas changer de statut de conflits, seulement la dimension dans laquelle on entre/sort
	// si x reste identique, on bouge dans la colonne, aucun conflit de cette colonne ne peut etre modifiée, par contre ceux de l'ancienne ligne
	// ne sont plus pertinents et ceux de la nouvelle ligne sont a prendre en compte

	if (current.x === previous.x) {
		for (let yy = 0; yy < size; yy++) {
			if (yy === previous.y) continue;
			const goalXX = snail[oldArr[yy * size + previous.x] - 1] % size;
			const goalYY = Math.floor(snail[oldArr[yy * size + previous.x] - 1] / size);
			if (goal.x === goalXX && ((yy > previous.y && goalYY < goal.y) || (yy < previous.y && goalYY > goal.y))) {
				oldConflicts++;
			}
		}
		for (let yy = 0; yy < size; yy++) {
			if (yy === current.y) continue;
			const goalXX = snail[newArr[yy * size + current.x] - 1] % size;
			const goalYY = Math.floor(snail[newArr[yy * size + current.x] - 1] / size);
			if (goal.x === goalXX && ((yy > current.y && goalYY < goal.y) || (yy < current.y && goalYY > goal.y))) {
				newConflicts++;
			}
		}
	}
	else {
		for (let xx = 0; xx < size; xx++) {
			if (xx === previous.x) continue;
			const goalXX = snail[oldArr[previous.y * size + xx] - 1] % size;
			const goalYY = Math.floor(snail[oldArr[previous.y * size + xx] - 1] / size);
			if (goal.y === goalYY && ((xx > previous.x && goalXX < goal.x) || (xx < previous.x && goalXX > goal.x))) {
				oldConflicts++;
			}
		}
		for (let xx = 0; xx < size; xx++) {
			if (xx === current.x) continue;
			const goalXX = snail[newArr[current.y * size + xx] - 1] % size;
			const goalYY = Math.floor(snail[newArr[current.y * size + xx] - 1] / size);
			if (goal.y === goalYY && ((xx > current.x && goalXX < goal.x) || (xx < current.x && goalXX > goal.x))) {
				newConflicts++;
			}
		}
	}
	
	if (newConflicts !== oldConflicts) {
		console.log("new conflicts ", newConflicts, " old ", oldConflicts);
	}
	let ret1 = (newConflicts - oldConflicts) * 2;
	let ret2 = updateManhattanDistance(current, previous, goal);
	console.log("ret update linear, conflicts = ", ret1, "updateManhattan = ",  ret2);
	return ret1 + ret2;
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
				if (goalX === goalXX && goalYY < goalY) {
					conflicts++;
				}
			}
		}
		if (y === goalY) { 
			for (let xx = x + 1; xx < size; xx++) {
				if (snail[arr[y * size + xx]] === 0) continue;
				const goalXX = snail[arr[y * size + xx] - 1] % size;
				const goalYY = Math.floor(snail[arr[y * size + xx] - 1] / size);
				if (goalY === goalYY && goalXX < goalX) {
					conflicts++;
				}
			}
		}
	}
	return ((conflicts * 2) + computeManhattanDistance(arr, size, snail));
};

export const computeRelaxedAdjacency = (arr, size, snail) => {
	let ret = 0;
	let idxZero = arr.indexOf(0); 
	let fakeArr = [...arr];
	let misplaced = [];
	let goalArr = computeGoalState(snail);
	for (let i = 0; i < fakeArr.length; i++) {
		if (fakeArr[i] === 0) continue;
		if (snail[fakeArr[i] - 1] !== i) {
			misplaced.push(fakeArr[i]);
		}
	}
	while (misplaced.length > 0) {
		if (idxZero === snail[snail.length - 1]) {
			const misplacedElem = misplaced[misplaced.length - 1];
			const idxMisplacedElem = fakeArr.indexOf(misplacedElem);
			fakeArr[idxZero] = fakeArr[idxMisplacedElem];
			fakeArr[idxMisplacedElem] = 0;
			idxZero = idxMisplacedElem;
		}
		else {
			const elemToMove = goalArr[idxZero];
			const idxElemToMove = fakeArr.indexOf(elemToMove);
			fakeArr[idxZero] = elemToMove;
			fakeArr[idxElemToMove] = 0;
			idxZero = idxElemToMove; 
			misplaced.splice(misplaced.indexOf(elemToMove), 1);
		}
		ret++;
	}
	return ret;
}

export const solve = (puzzleData) => {
	/*//TODO infos a transmettre
	let max_size = 0;
	let n_iter = 0;
	*/
	let runInfo = {
		time: Date.now(),
		timeComplexity: 0,
		sizeComplexity: 0,
		purgeStep: (puzzleData.purgeStep ? puzzleData.purgeStep : 0),
		solutionPath: (puzzleData.solutionPath ? puzzleData.solutionPath : []),
	};

	let [arr, size, snail, heuristic, weight] = [puzzleData.arr, puzzleData.size, puzzleData.snail, puzzleData.heuristic, puzzleData.weight];
	let openSet = new PriorityQueue();
	let openSetContent = {};
	let closedSet = {};
	let initialState = {
		arr: arr,
		cost: heuristic(arr, size, snail),
		idxZero: arr.indexOf(0),
		step: 0,
		previousState: null
	};

	closedSet[initialState.arr.toString()] = initialState.cost;
	const goalState = goalStateString(puzzleData);
	if (initialState.arr.toString() === goalState) {
		displayMessage("This is already the solution state");
		return;
	}

	const accessibleStatesFromInitial = accessibleStates(initialState, size, weight, heuristic, snail);
	for (let i = 0; i < accessibleStatesFromInitial.length; i++) {
		if (accessibleStatesFromInitial[i].arr.toString() === goalState) {
			return foundSolution(accessibleStatesFromInitial[i], runInfo);
		}
		openSet.enqueue(accessibleStatesFromInitial[i], accessibleStatesFromInitial[i].cost);
		openSetContent[accessibleStatesFromInitial[i].arr.toString()] = accessibleStatesFromInitial[i].cost;
	}

	while (!openSet.isEmpty()) {
		let state = openSet.dequeue();
		runInfo.timeComplexity++;
		let nextStates = accessibleStates(state.content, size, weight, heuristic, snail);
	
		for (let i = 0; i < nextStates.length; i++) {
			let accessibleState = nextStates[i];
			if (accessibleState.arr.toString() === goalState) {
				logTime(runInfo);
				return foundSolution(accessibleState, runInfo);
			}
			let stringArr = accessibleState.arr.toString();
			if (!isInClosedSetOrLowerCostInOpenSet(stringArr, accessibleState.cost, closedSet, openSetContent)) {
				closedSet[accessibleState.arr.toString()] = accessibleState.cost;
				openSet.enqueue(accessibleState, accessibleState.cost);
				openSetContent[accessibleState.arr.toString()] = accessibleState.cost;
			}
			runInfo.sizeComplexity = Math.max(openSet.getSize(), runInfo.sizeComplexity);
			if (runInfo.sizeComplexity > THRESHOLD_SIZE_COMPLEXITY) {
				let nextState = findMaxStepNode(openSet);	
				//				console.log(retrievePath(nextState));
				let nextPurgeStep = runInfo.purgeStep + nextState.step;
				let nextSolutionPath = runInfo.solutionPath.concat(retrievePath(nextState));
				console.log("Purge - we restart from ", nextState.arr, ", with cost ", nextState.cost);
				openSet = {};
				closedSet = {};
				runInfo = {};
				openSetContent = [];

				return solve({
					arr: nextState.arr,
					size: size,
					snail: snail,
					heuristic: heuristic,
					weight: weight,
					purgeStep: nextPurgeStep,
					solutionPath: nextSolutionPath
				});
			}
		}
	}
	displayMessage("There is no solution to this puzzle");
};

const findMaxStepNode = (openSet) => {
	let maxStep = null; 
	let heap = openSet.heap;
	for (let i = 1; i < heap.length; i++) {
		if (!maxStep || heap[i].content.step > maxStep.step) {
			maxStep = heap[i].content;
		}
	}
	return maxStep;
}

doTestsPriorityQueue();
doTestsLinearConflicts();
