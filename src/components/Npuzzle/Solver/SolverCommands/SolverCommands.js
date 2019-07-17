import React from 'react';


import Box from '../../../UI/Box/Box';

import AlgorithmSelector from './AlgorithmSelector/AlgorithmSelector';
import HeuristicSelector from './HeuristicSelector/HeuristicSelector';
import WeightChanger from './WeightChanger/WeightChanger';
import SolveButton from './SolveButton/SolveButton';
import ThresholdPurgeChanger from './ThresholdPurgeChanger/ThresholdPurgeChanger';

import {MAX_WEIGHT} from '../../../../helpers/Npuzzle/defines';

const SolverCommands = (props) => {

	const changeWeightHandler = (value) => {
		if (isNaN(value)) return;
		if (value) {
			let weight = parseInt(value);
			if (weight > MAX_WEIGHT) {
				weight = MAX_WEIGHT
			}
			props.weightChanged(weight);
		} else {
			props.weightChanged(0);
		}
	};

	return (
		<Box>
			<AlgorithmSelector algorithms={props.algorithms} selected={props.selectedAlgorithm}
							   changed={props.algorithmChanged}/>
			<HeuristicSelector heuristics={props.heuristics} selected={props.selectedHeuristic}
							   changed={props.heuristicChanged}
							   disabled={!props.algorithms[props.selectedAlgorithm].useHeuristic}/>
			<WeightChanger max={MAX_WEIGHT} weight={props.weight} changed={changeWeightHandler}
						   disabled={!props.algorithms[props.selectedAlgorithm].useHeuristic}/>
			<SolveButton solvable={props.solvable} solve={props.solve}/>
			<ThresholdPurgeChanger thresholdPurge={props.thresholdPurge} changed={props.thresholdPurgeChanged} />
		</Box>
	);
};

export default SolverCommands;
