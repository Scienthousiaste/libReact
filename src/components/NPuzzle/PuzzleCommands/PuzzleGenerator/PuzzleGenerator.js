import React, {useState} from 'react';

import classes from './PuzzleGenerator.less';

import { generateRandomArray } from '../../../../helpers/Npuzzle/functions';

import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';

const PuzzleGenerator = (props) => {

	const [state, setState] = useState({
		size: 0,
	});

	const changeSizeHandler = (event) => {
		const value = event.target.value;
		if (isNaN(value)) return;
		if (value) {
			setState({ ...state, size: parseInt(value) });
		} else {
			setState({ ...state, size: 0 });
		}
	};

	const onClickHandler = () => {
		props.createNewPuzzle(state.size, generateRandomArray(state.size));
	};

	return (
		<div className={classes.PuzzleGenerator}>
			<Input value={state.size} changed={changeSizeHandler} pressEnter={onClickHandler} />
			<Button clicked={onClickHandler}>Generate</Button>
		</div>
	);
};

export default PuzzleGenerator;