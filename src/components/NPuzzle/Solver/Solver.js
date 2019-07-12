import React, {useState, useEffect} from 'react';

import Button from '../../UI/Button/Button';
import Box from '../../UI/Box/Box';
import SolverCommand from './SolverCommands/SolverCommands';

import {computeLinearConflicts, computeManhattanDistance, solve} from '../../../algorithms/Npuzzle/algorithm';

import classes from './Solver.less';

const Solver = (props) => {

	const [state, setState] = useState({
		weight: 0,
		selectedHeuristic: 0,
	});

	const heuristics = [
		{value: 'manhattanDistance', func: computeManhattanDistance},
		{value: 'linearConflict', func: computeLinearConflicts},
	];

	useEffect(() => {
		setState({
			weight: 20,
			selectedHeuristic: 0,
		});
	}, []);

	const changeHeuristicHandler = (elem) => {
		setState({...state, selectedHeuristic: heuristics.indexOf(elem)});
	};

	const changeWeightHandler = (weight) => {
		setState({...state, weight: weight});
	};

	const resolveHandler = () => {
		const array = solve({
			arr: props.arrayNumbers,
			size: props.size,
			snail: props.snail,
			weight: state.weight,
			heuristic: heuristics[state.selectedHeuristic].func
		});
		if (array) {
			props.resolved(array);
		}
	};

	return (
		<div className={classes.Solver}>
			<SolverCommand heuristics={heuristics} selectedHeuristic={state.selectedHeuristic} weight={state.weight}
						   heuristicChanged={changeHeuristicHandler} weightChanged={changeWeightHandler}/>
			<Box>
				{
					props.solvable ? <Button clicked={resolveHandler}>Solve</Button>
						: <p>Unsolvable</p>
				}
				<Button clicked={() => alert(computeManhattanDistance(props.arrayNumbers, props.size, props.snail))}>Manhattan
					Distance</Button>
				<Button clicked={() => alert(computeLinearConflicts(props.arrayNumbers, props.size, props.snail))}>Linear
					Conflicts</Button>
			</Box>
		</div>
	)
};

export default Solver;
