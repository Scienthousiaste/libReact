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

*/


const solver = (props) => {

    const solve = (arr, snail) => {
        return (() => {
            if (arr[snail[0]] === 0) {
                return
            }
			computeManhattanDistance();
        })

    };
	
	const computeManhattanDistance = () => {
		console.log(props);
		let dist = 0;
		/*for (let i = 0; i < props.arr.length; i++) {
			let x_goal = snail[i] % props.size;
			let y_goal = snail[i] / props.size;
			//			dist += (i / props.size - y_goal)


		}*/

	}

    const solvable = props.inversions % 2 === 0 ? 1 : 0;
    return (
        solvable ? <button onClick={solve(props.arrayNumbers, props.snail)}>Solve</button> : <p>Unsolvable</p>
    )
};

export default solver;
