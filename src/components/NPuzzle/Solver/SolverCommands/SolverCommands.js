import React, {useState, useEffect} from 'react';

import classes from './SolverCommands.less';

import Radio from '../../../UI/Radio/Radio';
import Input from '../../../UI/Input/Input';
import Box from '../../../UI/Box/Box';

const SolverCommands = (props) => {


	const options = [...props.heuristics];
	options[props.selectedHeuristic]['selected'] = true;

	const changeWeightHandler = (event) => {
		const value = event.target.value;
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

		if (weight < 10000) {
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
				<Input value={props.weight}
					   changed={changeWeightHandler}
					   pressUp={onUpgradeHandler}
					   pressDown={onDowngradeHandler}/>
			</div>
		</Box>
	);
};

export default SolverCommands;