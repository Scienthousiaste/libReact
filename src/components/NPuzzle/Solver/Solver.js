import React, {useState, useEffect} from 'react';

import Button from '../../UI/Button/Button';
import Box from '../../UI/Box/Box';
import SolverCommand from './SolverCommands/SolverCommands';

import {computeLinearConflicts, computeManhattanDistance, computeRelaxedAdjacency, solve} from '../../../algorithms/Npuzzle/algorithm';

import classes from './Solver.less';

const Solver = (props) => {

	const [state, setState] = useState({
		weight: 0,
		selectedHeuristic: 0,
		selectedAlgorithm: 0,
	});

	const heuristics = [
		{value: 'manhattanDistance', func: computeManhattanDistance},
		{value: 'linearConflict', func: computeLinearConflicts},
		{value: 'relaxedAdjacency', func: computeRelaxedAdjacency},
	];
	const algorithms = [
		{value: 'weighted A*'},
		{value: 'greedy'},
		{value: 'uniform cost search'},
	];

	useEffect(() => {
		setState({
			weight: 20,
			selectedHeuristic: 0,
			selectedAlgorithm: 0,
		});
	}, []);

	const changeHeuristicHandler = (elem) => {
		setState({...state, selectedHeuristic: heuristics.indexOf(elem)});
	};

	const changeAlgorithmHandler = (elem) => {
		setState({...state, selectedAlgorithm: algorithms.indexOf(elem)});
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
			heuristic: heuristics[state.selectedHeuristic].func,
			algorithm: algorithms[state.selectedAlgorithm]
		});
		if (array) {
			props.resolved(array);
		}
	};

	return (
		<div className={classes.Solver}>
			<SolverCommand
				heuristics={heuristics}
				selectedHeuristic={state.selectedHeuristic} 
				algorithms={algorithms}
				selectedAlgorithm={state.selectedAlgorithm}
				weight={state.weight}
				heuristicChanged={changeHeuristicHandler}
				algorithmChanged={changeAlgorithmHandler}
				weightChanged={changeWeightHandler}
			/>
			<Box>
				{
					props.solvable ? <Button clicked={resolveHandler}>Solve</Button>
						: <p>Unsolvable</p>
				}
				<Button clicked={() => alert(computeManhattanDistance(props.arrayNumbers, props.size, props.snail))}>Manhattan
					Distance</Button>
				<Button clicked={() => alert(computeLinearConflicts(props.arrayNumbers, props.size, props.snail))}>Linear
					Conflicts</Button>
				<Button clicked={() => alert(computeRelaxedAdjacency(props.arrayNumbers, props.size, props.snail))}>Relaxed
					Adjacency</Button>
			</Box>
		</div>
	)
};

export default Solver;
