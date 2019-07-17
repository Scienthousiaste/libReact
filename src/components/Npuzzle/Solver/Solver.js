import React, {useState, useEffect} from 'react';

import SolverCommand from './SolverCommands/SolverCommands';
import SolveInfos from './SolveInfos/SolveInfos';

import {THRESHOLD_SIZE_COMPLEXITY} from '../../../helpers/Npuzzle/defines';

import {
	computeLinearConflicts,
	computeManhattanDistance,
	computeRelaxedAdjacency,
	solve,
	greedy,
	uniform
} from '../../../algorithms/Npuzzle/algorithm';

import classes from './Solver.less';

const Solver = (props) => {

	const [state, setState] = useState({
		weight: 0,
		selectedHeuristic: 0,
		selectedAlgorithm: 0,
		thresholdPurge: 0,
	});

	const heuristics = [
		{value: 'manhattanDistance', func: computeManhattanDistance},
		{value: 'linearConflict', func: computeLinearConflicts},
		{value: 'relaxedAdjacency', func: computeRelaxedAdjacency},
	];
	const algorithms = [
		{value: 'weighted A*', func: solve, useHeuristic: true},
		{value: 'greedy', func: greedy, useHeuristic: true},
		{value: 'uniform cost search', func: uniform, useHeuristic: false},
	];

	useEffect(() => {
		setState({
			weight: 2,
			selectedHeuristic: 0,
			selectedAlgorithm: 0,
			thresholdPurge: THRESHOLD_SIZE_COMPLEXITY,
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

	const changeThresholdPurgeHandler = (thresholdPurge) => {
		setState({...state, thresholdPurge: thresholdPurge});
	}

	const resolveHandler = () => {
		props.waiting();
		setTimeout(() => {
			const solution = algorithms[state.selectedAlgorithm].func({
				arr: props.arrayNumbers,
				size: props.size,
				snail: props.snail,
				weight: state.weight,
				heuristic: heuristics[state.selectedHeuristic].func,
				thresholdPurge: state.thresholdPurge,
			});
			if (solution) {
				props.resolved(solution);
			}
		}, 0);
	};

	return (
		<div className={classes.Solver}>
			<SolverCommand
				heuristics={heuristics}
				selectedHeuristic={state.selectedHeuristic}
				algorithms={algorithms}
				selectedAlgorithm={state.selectedAlgorithm}
				weight={state.weight}
				thresholdPurge={state.thresholdPurge}

				heuristicChanged={changeHeuristicHandler}
				algorithmChanged={changeAlgorithmHandler}
				weightChanged={changeWeightHandler}
				thresholdPurgeChanged={changeThresholdPurgeHandler}

				solvable={props.solvable}
				solve={resolveHandler}
			/>
			<SolveInfos show={props.solution.time != null} time={props.solution.time}
						timeComplexity={props.solution.timeComplexity} sizeComplexity={props.solution.sizeComplexity}
						steps={props.solution.steps} purges={props.solution.purges} />
		</div>
	)
};

export default Solver;
