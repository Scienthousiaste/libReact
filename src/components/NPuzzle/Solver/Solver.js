import React, { useState, useEffect } from 'react';

import PriorityQueue from '../../../helpers/Npuzzle/PriorityQueue'
import Button from '../../UI/Button/Button';

import doTestsPriorityQueue from '../../../tests/helpers/PriorityQueue.test'

/*
The user must be able to choose between at LEAST 3 (relevant) heuristic functions.
	The Manhattan-distance heuristic is mandatory, the other two are up to you. By
"relevant" we mean they must be admissible (Read up on what this means) and
they must be something other than "just return a random value because #YOLO".
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

Linear Conflict + Manhattan Distance/Taxicab geometry 
Two tiles ‘a’ and ‘b’ are in a linear conflict if they are in the same row or column ,also their goal positions are in the same row or column and the goal position of one of the tiles is blocked by the other tile in that row.

Let’s take the following example

n-P3

In this instance we see that tile 4 and tile 1 are in a linear conflict since we see that tile 4 is in the path of the goal position of tile 1 in the same column or vice versa, also tile 8 and tile 7 are in a linear conflict as 8 stands in the path of the goal position of tile 7 in the same row. Hence here we see there are 2 linear conflicts.

As we know that heuristic value is the value that gives a theoretical least value of the number of moves required to solve the problem we can see that one linear conflict causes two moves to be added to the final heuristic value(h) as one tile will have to move aside in order to make way for the tile that has the goal state behind the moved tile and then back resulting in 2 moves which retains the admissibility of the heuristic.

Linear conflict is always combined with the Manhattan distance to get the heuristic value of that state and each linear conflict will add 2 moves to the Manhattan distance as explained above, so the ‘h’ value for the above state will be

Manhattan distance + 2*number of linear conflicts
Manhattan distance for the state is: 10
Final h: 10 + 2*2= 14

Linear Conflict combined with Manhattan distance is significantly way faster than the heuristics explained above and 4 x 4 puzzles can be solved using it in a decent amount of time.Just as the rest of the heuristics above we do not 





from correction
Output correctness
The students have the output required by the subject, which is:
	- Complexity in time
	- Complexity in size
	- Number of moves from initial state to solution

- Ordered sequence of states that make up the solution

a chaque iteration de la boucle, A* choisit d'etendre le chemin qui minimise
f(n) = g(n) + h(n)
- h: heuristique (manhattan, etc)
- g: cout depuis start jusqu'a l'état n

il faut accepter des fichiers en theorie... > node ?



	// implémenter A*, puis weightedA* (beaucoup plus rapide)
	// heuristiques : conflits lineaires
	*/

//doTestsPriorityQueue();

const displayMessage = (msg) => {
	alert(msg);
}

const retrievePath = (finalState) => {
	console.log(finalState);
	let path = [];
	let curState = finalState;
	while (curState != null) {
		path.unshift(curState.arr);	
		curState = curState.previousState;
	}
	console.log(path);
}

const foundSolution = (solutionState) => {
	displayMessage("Found solution on step " + solutionState.step);
	retrievePath(solutionState);
	return 0;
}


const Solver = (props) => {
	//TODO : permettre de changer le weight, permettre de changer l'heuristique, optimiser manhattanDistance
	const size = props.size;
	const snail = props.snail;

	const [state, setState] = useState({
		weight: 0,
		heuristic: ()=>{},
	});

	useEffect(() => {
		setState({
			...state,
			weight: 20,
			heuristic: computeManhattanDistance,
		});
	}, [snail, size, state]);


	const solve = (puzzleData) => {
		/*//TODO
		let max_size = 0;
		let n_iter = 0;
		*/

		let openSet = new PriorityQueue();
		let alreadyAccessedStates = {};
		let initialState = {
			arr: puzzleData.arr,
			cost: state.heuristic(puzzleData.arr),
			idxZero: puzzleData.arr.indexOf(0),
			step: 0,
			previousState: null
		};

		alreadyAccessedStates[initialState.arr.toString()] = initialState.cost;

		if (puzzleData.idxZero === -1) {
			displayMessage("Error: no zero found in the puzzle");
			return ;
		}

		const goalState = goalStateString(puzzleData); 
		if (initialState.arr.toString() === goalState) {
			displayMessage("This is already the solution state");
			return ;
		}

		const accessibleStatesFromInitial = accessibleStates(initialState);
		for (let i = 0; i < accessibleStatesFromInitial.length; i++) {
			if (accessibleStatesFromInitial[i].arr.toString() === goalState) {
				return foundSolution(accessibleStatesFromInitial[i]);
			}
			openSet.enqueue(accessibleStatesFromInitial[i], accessibleStatesFromInitial[i].cost);
		}

		while (!openSet.isEmpty()) {
			let state = openSet.dequeue();
			let nextStates = accessibleStates(state.content);

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

	const goalStateString = (puzzleData) => { 
		let arr = Array(puzzleData.snail.length);
		for (let i = 0; i < arr.length - 1; i++) {
			arr[puzzleData.snail[i]] = i + 1;
		}
		arr[puzzleData.snail[puzzleData.snail.length - 1]] = 0;
		return arr.toString();	
	};

	const accessibleStates = (curState) => {
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
					cost: newStep + state.weight * state.heuristic(newArr),
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

	const computeManhattanDistance = (arr) => {
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

	const computeLinearConflicts = (arr) => {
		let conflicts = 0;
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] == 0) continue;
			const goalX = snail[arr[i] - 1] % size;
			const goalY = Math.floor(snail[arr[i] - 1] / size);
			const x = i % size;
			const y = Math.floor(i / size);
			if (x == goalX) {
				for (let xx = x + 1; xx < size; xx++) {
					const goalXX = snail[arr[y * size + xx]] % size;
					if (goalXX == goalX) conflicts++;
				}
			}
			if (y == goalY) {
				for (let yy = y + 1; yy < size; yy++) {
					const goalYY = Math.floor(snail[arr[yy * size + x]] / size);
					if (goalYY == goalY) conflicts++;
				}
			}
		}
		return ((conflicts * 2) + computeManhattanDistance(arr));
	}

	return (
		<div>
			{	
				props.solvable	? <Button clicked={() => solve({arr: props.arrayNumbers, size: props.size, snail: props.snail})}>Solve</Button>
					: <p>Unsolvable</p>
			}
			<Button clicked={() => alert(computeManhattanDistance(props.arrayNumbers))}>Manhattan Distance</Button>
			<Button clicked={() => alert(computeLinearConflicts(props.arrayNumbers))}>Linear Conflicts</Button>
		</div>
	)
};

export default Solver;
