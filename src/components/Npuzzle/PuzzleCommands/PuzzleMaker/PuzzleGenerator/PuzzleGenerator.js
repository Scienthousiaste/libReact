import React, {useState} from 'react';

import { generateRandomArray } from '../../../../../helpers/Npuzzle/functions';

import Part from '../../../../UI/Part/Part';
import Button from '../../../../UI/Button/Button';
import Input from '../../../../UI/Input/Input';

const PuzzleGenerator = (props) => {

	const [state, setState] = useState({
		size: 0,
	});

	const onClickHandler = () => {
		props.createNewPuzzle(state.size, generateRandomArray(state.size));
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
			<Button clicked={onClickHandler}>Generate</Button>
		</Part>
	);
};

export default PuzzleGenerator;