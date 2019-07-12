import React, { useState, useEffect } from 'react';

import Button from '../../UI/Button/Button';

import doTestsPriorityQueue from '../../../tests/helpers/NPuzzle/PriorityQueue.test';
import { computeLinearConflicts, computeManhattanDistance, solve } from '../../../algorithms/Npuzzle/algorithm';

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

doTestsPriorityQueue();

const displayMessage = (msg) => {
	alert(msg);
};





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
			weight: 20,
			heuristic: computeManhattanDistance,
		});
	}, [snail, size, computeManhattanDistance]);





	return (
		<div>
			{	
				props.solvable	? <Button clicked={() => solve({arr: props.arrayNumbers, size: props.size, snail: props.snail, weight: state.weight, heuristic: state.heuristic})}>Solve</Button>
					: <p>Unsolvable</p>
			}
			<Button clicked={() => alert(computeManhattanDistance(props.arrayNumbers, props.size, props.snail))}>Manhattan Distance</Button>
			<Button clicked={() => alert(computeLinearConflicts(props.arrayNumbers, props.size, props.snail))}>Linear Conflicts</Button>
		</div>
	)
};

export default Solver;
