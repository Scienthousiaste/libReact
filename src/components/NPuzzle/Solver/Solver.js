import React from 'react';

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


const solver = (props) => {

	const solve = (pb) => {
		let max_size = 0;
		let n_iter = 0;

		pb.idxZero = pb.arr.indexOf(0);
		if (pb.idxZero === -1) {
			displayMessage("Error: no zero found in the puzzle");
			return ;
		}

		let queue = accessibleStates(pb);
		console.log("queue: ", queue);
			/*
		while (queue.length > 0) {
			queue.pop();
		}
		*/

	};


	const accessibleStates = (pb) => {
		let ret = [];
		[1, -1, pb.size, -pb.size].forEach(x => {
			let newIdx = pb.idxZero + x;
			if ((newIdx >= 0 && newIdx < pb.arr.length
					&& !((pb.idxZero % pb.size === pb.size - 1) && (newIdx % pb.size === 0))
					&& !((pb.idxZero % pb.size === 0) && (newIdx % pb.size) === (pb.size - 1)))) {
				let newState = {arr:[...pb.arr], size: pb.size, idxZero:pb.idxZero + x};
				newState.arr[pb.idxZero] = newState.arr[pb.idxZero + x];
				newState.arr[pb.idxZero + x] = 0;
				ret.push(newState);
			}
		})
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
		props.solvable	? <Button clicked={() => solve({arr: props.arrayNumbers, size: props.size, snail: props.snail})}>Solve</Button>
						: <p>Unsolvable</p>
	)
};

export default solver;
