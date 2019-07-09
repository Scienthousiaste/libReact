import React, {useState, useEffect} from 'react';

import classes from './NPuzzle.less';

import {computeSnailIteration, countInversions, generateRandomArray} from '../../helpers/Npuzzle/functions';

import TileSet from './TileSet/TileSet';
import Spinner from '../UI/Spinner/Spinner';
import PuzzleInfos from './PuzzleInfos/PuzzleInfos';
import PuzzleCommands from './PuzzleCommands/PuzzleCommands';

const NPuzzle = () => {
	const [state, setState] = useState({
		snail: null,
		size: 0,
		arrayNumbers: null,
		loading: true,
	});

	useEffect(() => {
		const size = 4;
		setState({
			...state,
			snail: computeSnailIteration(size),
			size: size,
			arrayNumbers: generateRandomArray(size),
			loading: false,
		});
	}, []);

	const trySwap = (value) => {
		let idx = state.arrayNumbers.findIndex((element) => element === value);
		if (idx !== -1 && value !== 0) {
			const idxZero = state.arrayNumbers.findIndex((element) => element === 0);
			if (((idxZero === idx + 1) && (idxZero % state.size !== 0))
				|| ((idxZero === idx - 1) && (idxZero % state.size !== state.size - 1))
				|| idxZero === idx + state.size
				|| idxZero === idx - state.size) {

				const newArr = [...state.arrayNumbers];
				newArr[idx] = state.arrayNumbers[idxZero];
				newArr[idxZero] = state.arrayNumbers[idx];
				setState({...state, arrayNumbers: newArr});
			}
		}
	};

	const setNewPuzzle = (size, array) => {
		setState({
			...state,
			snail: computeSnailIteration(size),
			size: size,
			arrayNumbers: array,
		});
	};

	let board = <Spinner/>;

	if (!state.loading) {
		board = (
			<div className={classes.Board}>
				<TileSet arrayNumbers={state.arrayNumbers} size={state.size} clicked={trySwap}/>
				<PuzzleInfos arrayNumbers={state.arrayNumbers} snail={state.snail}/>
			</div>
		);
	}

	return (
		<div className={classes.Npuzzle}>
			<PuzzleCommands createNewPuzzle={setNewPuzzle} />
			{board}
		</div>
	)
};

export default NPuzzle;
