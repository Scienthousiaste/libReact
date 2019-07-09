import React from 'react';


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


const solver = (props) => {

    const solve = (arr, snail) => {
        return (() => {
			alert(computeManhattanDistance());
        })
    };
	
	//TODO : comparer performances avec differentes versions de computeManhattanDistance
	// virer les ternaires, etc
	const computeManhattanDistance = () => {
		let dist = 0;
		for (let i = 0; i < props.arrayNumbers.length; i++) {
			const x_current = i % props.size;
			const y_current = Math.floor(i / props.size);
			const x_goal = props.arrayNumbers[i] === 0 ? props.snail[props.arrayNumbers.length - 1] % props.size
												     : props.snail[props.arrayNumbers[i] - 1] % props.size;
			const y_goal = props.arrayNumbers[i] === 0 ? Math.floor(props.snail[props.arrayNumbers.length - 1] / props.size)
													 : Math.floor(props.snail[props.arrayNumbers[i] - 1] / props.size);

			dist += Math.abs(y_current - y_goal) + Math.abs(x_current - x_goal);
		}
		return dist;
	}

    return (
        props.solvable ? <button onClick={solve(props.arrayNumbers, props.snail)}>Solve</button> : <p>Unsolvable</p>
    )
};

export default solver;
