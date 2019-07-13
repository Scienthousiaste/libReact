import React, {useState, useEffect} from 'react';

import classes from './SolverCommands.less';

import Radio from '../../../UI/Radio/Radio';
import Input from '../../../UI/Input/Input';
import Box from '../../../UI/Box/Box';
import Slider from '@material-ui/core/Slider';
import { MAX_WEIGHT } from '../../../../helpers/Npuzzle/defines';

const SolverCommands = (props) => {


	const options = [...props.heuristics];
	options[props.selectedHeuristic]['selected'] = true;

	const changeWeightHandler = (value) => {
		if (isNaN(value)) return;
		if (value) {
			let weight = parseInt(value);
			if (weight > 10000) {
				weight = 10000
			}
			props.weightChanged(weight);
		} else {
			props.weightChanged(0);
		}
	};

	const onUpgradeHandler = () => {
		const weight = props.weight;

		if (weight < MAX_WEIGHT) {
			props.weightChanged(weight + 1);
		}
	};

	const onDowngradeHandler = () => {
		const weight = props.weight;

		if (weight > 0) {
			props.weightChanged(weight - 1);
		}
	};

	return (
		<Box>
			<div className={classes.SolverCommands}>
				<Radio name={'heuristic'} options={options} clicked={(elem) => props.heuristicChanged(elem)}/>
				<Slider step={1} min={1} max={ MAX_WEIGHT } value={props.weight} valueLabelDisplay={'auto'} onChange={(_, value) => changeWeightHandler(value)} />
			</div>
		</Box>
	);
};

export default SolverCommands;