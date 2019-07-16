import React, { useState } from 'react';

import {computeSnailIteration, countInversions, generateRandomArray} from '../../../../../helpers/Npuzzle/functions';

import Part from '../../../../UI/Part/Part';
import Button from '../../../../UI/Button/Button';
import Input from '../../../../UI/Input/Input';
import CheckBox from '../../../../UI/CheckBox/CheckBox';

const PuzzleGenerator = (props) => {

	const [state, setState] = useState({
		size: 0,
		forceValidity: true,
	});

	const onClickHandler = () => {
		const snail = computeSnailIteration(state.size);
		let array = generateRandomArray(state.size);
		if (state.forceValidity === true) {
			while (countInversions(array, snail) % 2) {
				array = generateRandomArray(state.size);
			}
		}
		props.createNewPuzzle(state.size, array);
	};

	const changeSizeHandler = (event) => {
		const value = event.target.value;
		if (isNaN(value)) return;
		if (value) {
			let size = parseInt(value);
			if (size > 20) {size = 20}
			setState({ ...state, size: size });
		} else {
			setState({ ...state, size: 0 });
		}
	};

	const toggleForceSolvableHandler = () => {
		setState({
			...state,
			forceValidity: !state.forceValidity,
		});
	};

	const onUpgradeHandler = () => {
		const size = state.size;

		if (size < 20) {
			setState({ ...state, size: size + 1 });
		}
	};

	const onDowngradeHandler = () => {
		const size = state.size;

		if (size > 0) {
			setState({ ...state, size: size - 1 });
		}
	};

	return (
		<Part title="Generate random puzzle">
			<Input value={state.size} changed={changeSizeHandler} pressEnter={onClickHandler} pressUp={onUpgradeHandler} pressDown={onDowngradeHandler} />
			<CheckBox checked={state.forceValidity} clicked={toggleForceSolvableHandler} name="forceValidity">force validity</CheckBox>
			<Button clicked={onClickHandler} disabled={state.size < 2} color="primary">Generate</Button>
		</Part>
	);
};

export default PuzzleGenerator;