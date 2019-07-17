import PriorityQueue from '../../helpers/Npuzzle/PriorityQueue';
import doTestsPriorityQueue from '../../tests/helpers/Npuzzle/PriorityQueue.test';
import doTestsLinearConflicts from '../../tests/algorithms/Npuzzle/algorithm.test';
import {THRESHOLD_SIZE_COMPLEXITY} from '../../helpers/Npuzzle/defines';

/*

The students have implemented an option to do a greedy search and are able to explain it.
The students have implemented an option to do a uniform-cost search and are able to explain it.

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
	console.log("Time to find the solution: " + ((Number(Date.now()) - Number(runInfo.time)) / 1000) + "s");
};

const isInClosedSetOrLowerCostInOpenSet = (stringArr, cost, closedSet, openSetContent) => {
	return (closedSet[stringArr] || (openSetContent && openSetContent[stringArr] < cost));
};

const retrievePath = (finalState) => {
	let path = [];
	let curState = finalState;
	while (curState != null) {
		path.unshift(curState.arr);
		curState = curState.previousState;
	}
	return path;
};

const foundSolution = (solutionState, runInfo) => ({
	path: runInfo.solutionPath.concat(retrievePath(solutionState)),
	infos: runInfo,
});

const accessibleStates = (curState, data) => {

	let ret = [];
	let dir = [1, -1, data.size, -data.size];

	for (let i = 0; i < dir.length; i++) {
		let d = dir[i];
		let newIdx = curState.idxZero + d;
		let x_cur_zero = curState.idxZero % data.size;
		let y_cur_zero = Math.floor(curState.idxZero / data.size);
		let x_new_zero = newIdx % data.size;
		let y_new_zero = Math.floor(newIdx / data.size);

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

			const newStep = curState.step + 1;
			const newCost = data.stepMultiplier * newStep + data.weight * data.heuristic(newArr, data.size, data.snail);
			const newState = {
				arr: newArr,
				idxZero: curState.idxZero + d,
				cost: newCost,
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
	} else {
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
	console.log("ret update linear, conflicts = ", ret1, "updateManhattan = ", ret2);
	return ret1 + ret2;
}

export const uniformCostHeuristic = () => {
	return 0;
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
		} else {
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

export const greedy = (puzzleData) => {
	return solve({...puzzleData, greedy: true});
	/*
	let data = {
		...puzzleData,
		time: Date.now(),
		timeComplexity: 0,
		sizeComplexity: 0,
		closedSet: {},
		goalState: goalStateString(puzzleData),
		bestCost: Infinity,
		best: null,
		openSet: new PriorityQueue()
	}

	let initialState = {
		arr: data.arr,
		idxZero: data.arr.indexOf(0),
		step: 0,
		previousState: null
	};
	data.closedSet[initialState.arr.toString()] = initialState.step;
	if (initialState.arr.toString() === data.goalState) {
		displayMessage("This is already the solution state");
		return;
	}

	const accessibleStatesFromInitial = accessibleStates(initialState, puzzleData);
	for (let i = 0; i < accessibleStatesFromInitial.length; i++) {
		if (accessibleStatesFromInitial[i].arr.toString() === data.goalState) {
			return foundSolution(accessibleStatesFromInitial[i], data);
		}
		data.best = data.bestCost < accessibleStatesFromInitial[i].cost ? data.best : accessibleStatesFromInitial[i];
	}
	data.openSet.enqueue(data.best, data.best.cost);
	data.closedSet[data.best.arr.toString()] = data.best.cost;

	while (data.best.arr.toString() !== data.goalState) {
		data.timeComplexity += 1;
		const state = data.openSet.dequeue();
		const nextStates = accessibleStates(state.content, data);
	
		for (let i = 0; i < nextStates.length; i++) {
			const accessibleState = nextStates[i];
			console.log(accessibleState);
			if (accessibleState.arr.toString() === data.goalState) {
				return foundSolution(accessibleState, data);
			}
			const stringArr = accessibleState.arr.toString();

			//if (!isInClosedSetOrLowerCostInOpenSet(stringArr, accessibleState.cost, data.closedSet, null)) {
				data.best = data.bestCost < accessibleState.cost ? data.best : accessibleState;
			//}
		}
		data.openSet.enqueue(data.best, data.best.cost);
		data.closedSet[data.best.arr.toString()] = data.best.cost;
		data.sizeComplexity = Math.max(data.openSet.getSize(), data.sizeComplexity);
	}
	displayMessage("There is no solution to this puzzle");
	*/
}

export const uniform = (puzzleData) => {
	return solve({...puzzleData, heuristic: uniformCostHeuristic});
}

export const solve = (puzzleData) => {
	let runInfo = {
		...puzzleData,
		thresholdPurge: (puzzleData.thresholdPurge ? puzzleData.thresholdPurge : THRESHOLD_SIZE_COMPLEXITY),
		timeComplexity: (puzzleData.timeComplexity ? puzzleData.timeComplexity : 0),
		sizeComplexity: 0,
		sizeComplexityTotal: (puzzleData.sizeComplexityTotal ? puzzleData.sizeComplexityTotal : 0),
		purgeStep: (puzzleData.purgeStep ? puzzleData.purgeStep : 0),
		solutionPath: (puzzleData.solutionPath ? puzzleData.solutionPath : []),
		time: (puzzleData.time ? puzzleData.time : Date.now()),
		goalState: (puzzleData.goalState ? puzzleData.goalState : goalStateString(puzzleData)),
		stepMultiplier: (puzzleData.greedy === true ? 0 : 1),
		purges: puzzleData.purges ? [...puzzleData.purges] : [],
	};

	/* CLEANING
	- should not use puzzleData anymore, only runInfo 
	- openSet, closedSet, etc in runInfo
	*/

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
	if (initialState.arr.toString() === runInfo.goalState) {
		displayMessage("This is already the solution state");
		return;
	}

	const accessibleStatesFromInitial = accessibleStates(initialState, runInfo);
	for (let i = 0; i < accessibleStatesFromInitial.length; i++) {
		if (accessibleStatesFromInitial[i].arr.toString() === runInfo.goalState) {
			return foundSolution(accessibleStatesFromInitial[i], runInfo);
		}
		openSet.enqueue(accessibleStatesFromInitial[i], accessibleStatesFromInitial[i].cost);
		openSetContent[accessibleStatesFromInitial[i].arr.toString()] = accessibleStatesFromInitial[i].cost;
	}

	while (!openSet.isEmpty()) {
		runInfo.timeComplexity++;
		const state = openSet.dequeue();
		const nextStates = accessibleStates(state.content, runInfo);

		for (let i = 0; i < nextStates.length; i++) {
			const accessibleState = nextStates[i];
			if (accessibleState.arr.toString() === runInfo.goalState) {
				return foundSolution(accessibleState, runInfo);
			}
			const stringArr = accessibleState.arr.toString();
			if (!isInClosedSetOrLowerCostInOpenSet(stringArr, accessibleState.cost, closedSet, openSetContent)) {
				closedSet[accessibleState.arr.toString()] = accessibleState.cost;
				openSet.enqueue(accessibleState, accessibleState.cost);
				openSetContent[accessibleState.arr.toString()] = accessibleState.cost;
			}
			runInfo.sizeComplexity = Math.max(openSet.getSize(), runInfo.sizeComplexity);
			if (runInfo.sizeComplexity > runInfo.thresholdPurge) {
				const nextState = findMaxStepNode(openSet);
				if (runInfo.purges.length && runInfo.purges[runInfo.purges.length - 1].cost <= nextState.cost) {
					return ({error: true});
				}
				const nextRunInfo = {
					...runInfo,
					heuristic: heuristic,
					snail: snail,
					size: size,
					weight: weight,
					arr: nextState.arr,
					purgeStep: runInfo.purgeStep + nextState.step,
					solutionPath: runInfo.solutionPath.concat(retrievePath(nextState)),
					sizeComplexityTotal: runInfo.sizeComplexity + runInfo.sizeComplexityTotal,
					purges: [...runInfo.purges, {cost: nextState.cost, step: nextState.step}],
				};
				console.log("Purge - we restart from ", nextState.arr, ", with cost ", nextState.cost);
				//TODO reverif que time complexity est ok
				openSet = {};
				openSetContent = {};
				closedSet = {};
				runInfo = {};
				return solve(nextRunInfo);
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
