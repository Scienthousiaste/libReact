import React, { useState, useEffect } from 'react';

import Button from '../../UI/Button/Button';

import { computeLinearConflicts, computeManhattanDistance, solve } from '../../../algorithms/Npuzzle/algorithm';


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
