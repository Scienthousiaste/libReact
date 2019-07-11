import React, { useState, useEffect } from 'react';

import PriorityQueue from '../../../helpers/Npuzzle/PriorityQueue.js'
import Button from '../../UI/Button/Button';

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

const displayMessage = (msg) => {
	alert(msg);
}

const Solver = (props) => {
	const size = props.size;
	const snail = props.snail;

	const [state, setState] = useState({
		weight: 0,
		heuristic: ()=>{},
	});

	useEffect(() => {
		setState({
			...state,
			weight: 1,
			heuristic: computeManhattanDistance,
		});
	}, []);

	const solve = (puzzleData) => {
		/*//TODO
		let max_size = 0;
		let n_iter = 0;
		*/

		let openSet = new PriorityQueue();
		let alreadyAccessedStates = {};
		let initialState = {
			arr: puzzleData.arr,
			cost: computeManhattanDistance(puzzleData.arr),
			idxZero: puzzleData.arr.indexOf(0),
			step: 0
		};

		alreadyAccessedStates[initialState.arr.toString()] = initialState.cost;

		if (puzzleData.idxZero === -1) {
			displayMessage("Error: no zero found in the puzzle");
			return ;
		}

		const goalState = goalStateString(puzzleData); 
		if (initialState.arr.toString() === goalState) {
			alert("goal");
			return ;
		}
		accessibleStates(initialState).forEach(accessibleState => {
			openSet.enqueue(accessibleState, accessibleState.cost);
		});
		console.log(openSet);

		while (!openSet.isEmpty()) {
			let state = openSet.dequeue();
			/*			if (state.content.step > 1) { // pour eviter loop infinie
				return ;
			}*/
			let nextStates = accessibleStates(state.content);

			for (let i = 0; i < nextStates.length; i++) {
				let accessibleState = nextStates[i];
				if (!alreadyAccessedStates[accessibleState.arr.toString()]) {
					//TODO:  si v existe dans closedList (devrait etre bon) ou si v existe dans openList avec un cout inférieur (pas bon..)
					if (accessibleState.arr.toString() === goalState) {
						console.log(openSet.heap.length);
						alert("Found solution on step " + accessibleState.step);
						return ;
					}
					alreadyAccessedStates[accessibleState.arr.toString()] = accessibleState.cost;
					openSet.enqueue(accessibleState, accessibleState.cost);
				}
			}
		}
		alert("no solution");
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
			if ((newIdx >= 0 && newIdx < curState.arr.length
				&& !((curState.idxZero % size === size - 1) && (newIdx % size === 0))
				&& !((curState.idxZero % size === 0) && (newIdx % size === size - 1)))) {

				let newStep = curState.step + 1;
				let newArr = [...curState.arr];
				newArr[curState.idxZero] = newArr[curState.idxZero + d];
				newArr[curState.idxZero + d] = 0;
				const newState = {
					arr:newArr,
					idxZero: curState.idxZero + d,
					cost: newStep + state.weight * computeManhattanDistance(newArr),
					step: newStep,
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

	return (
		<div>
			{	
				props.solvable	? <Button clicked={() => solve({arr: props.arrayNumbers, size: props.size, snail: props.snail})}>Solve</Button>
					: <p>Unsolvable</p>
			}
			<Button clicked={() => alert(computeManhattanDistance(props.arrayNumbers))}>Manhattan Distance</Button>
		</div>
	)
};

export default Solver;
