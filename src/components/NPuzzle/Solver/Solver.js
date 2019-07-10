import React from 'react';

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


	/*
function A_Star(start, goal)

openSet := {start}
cameFrom := an empty map
gScore := map with default value of Infinity
gScore[start] := 0

//For node n, fScore[n] := gScore[n] + heuristic_cost_estimate(n, goal).

fScore := map with default value of Infinity
fScore[start] := heuristic_cost_estimate(start, goal)

while openSet is not empty
	current := the node in openSet having the lowest fScore[] value
	if current = goal
		return reconstruct_path(cameFrom, current)

	openSet.Remove(current)

	for each neighbor of current
		tentative_gScore := gScore[current] + distance(current, neighbor)
		if tentative_gScore < gScore[neighbor]
			cameFrom[neighbor] := current
		gScore[neighbor] := tentative_gScore
		fScore[neighbor] := gScore[neighbor] + heuristic_cost_estimate(neighbor, goal)
	
		if neighbor not in openSet
			openSet.Add(neighbor)
	return failure
*/


const solver = (props) => {
	const size = props.size;

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
			idxZero: puzzleData.arr.indexOf(0)
		};
		
		alreadyAccessedStates[initialState.arr.toString()] = initialState.cost;

		if (puzzleData.idxZero === -1) {
			displayMessage("Error: no zero found in the puzzle");
			return ;
		}

		const goalState = goalStateString(puzzleData); 
		if (initialState.arr.toString() == goalState) {
			alert("goal");
			return ;
		}
		accessibleStates(initialState, computeManhattanDistance).forEach(accessibleState => {
			openSet.enqueue(accessibleState, accessibleState.cost);
		});


		let test = 1; // test est a virer
		while (!openSet.isEmpty() && test > 0) {
			test--;
			if (test == 0) {console.log(alreadyAccessedStates)};
			let state = openSet.dequeue();

			if (state.content.arr.toString() === goalState) {
				alert("goal");
				break;
			}
			accessibleStates(state.content, computeManhattanDistance).forEach(accessibleState => {
				if (!alreadyAccessedStates[accessibleState.arr.toString()]) {
					//check goal atteint ici ?
					alreadyAccessedStates[accessibleState.arr.toString()] = accessibleState.cost;
					openSet.enqueue(accessibleState, accessibleState.cost);
				}
			})
		}

	};

	const goalStateString = (puzzleData) => { 
		let arr = Array(puzzleData.snail.length);
		for (let i = 0; i < arr.length - 1; i++) {
			arr[puzzleData.snail[i]] = i + 1;
		}
		arr[puzzleData.snail[puzzleData.snail.length - 1]] = 0;
		return arr.toString();	
	};

	const accessibleStates = (curState, computeCost) => {
		//TODO(opti): computeCost => updateCost
		let ret = [];
		[1, -1, size, -size].forEach(x => {
			let newIdx = curState.idxZero + x;
			if ((newIdx >= 0 && newIdx < curState.arr.length
				&& !((curState.idxZero % size === size - 1) && (newIdx % size === 0))
				&& !((curState.idxZero % size === 0) && (newIdx % size) === (size - 1)))) {
				
				let newState = {
					arr:[...curState.arr],
					idxZero: curState.idxZero + x,
				};
				newState.arr[curState.idxZero] = newState.arr[curState.idxZero + x];
				newState.arr[curState.idxZero + x] = 0;
				newState.cost = 1 + 10 * computeCost(newState.arr); // Ces 1 et 5 determine la force du next step VS l'heuristique
				ret.push(newState);
			}
		})
		if (ret.length > 4){alert("ici, ouillle")};
		return ret;
	}

	//TODO : comparer performances avec differentes versions de computeManhattanDistance
	//TODO : get old manhattan distance and check if it goes up or down

	const computeManhattanDistance = (arr) => {
		let dist = 0;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === 0) continue;
			const x_current = i % props.size;
			const y_current = Math.floor(i / props.size);
			const x_goal = props.snail[arr[i] - 1] % props.size;
			const y_goal = Math.floor(props.snail[arr[i] - 1] / props.size);
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

export default solver;
