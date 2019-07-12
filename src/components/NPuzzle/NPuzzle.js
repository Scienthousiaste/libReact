import React, {useState, useEffect} from 'react';
import classes from './NPuzzle.less';

import {computeSnailIteration, countInversions, generateRandomArray} from '../../helpers/Npuzzle/functions';

import TileSet from './TileSet/TileSet';
import Spinner from '../UI/Spinner/Spinner';
import PuzzleInfos from './PuzzleInfos/PuzzleInfos';
import PuzzleCommands from './PuzzleCommands/PuzzleCommands';
import Solver from './Solver/Solver';


const NPuzzle = () => {
	const [state, setState] = useState({
		snail: null,
		size: 0,
		arrayNumbers: null,
		solvable: false,
		loading: true,
	});

	useEffect(() => {
		const size = 5;
		const array = generateRandomArray(size, true);
		const snail = computeSnailIteration(size);
		setState({
			snail: snail,
			size: size,
			arrayNumbers: array,
			solvable: countInversions(array, snail) % 2 === 0,
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
		const snail = computeSnailIteration(size);
		setState({
			...state,
			snail: snail,
			size: size,
			arrayNumbers: array,
			solvable: countInversions(array, snail) % 2 === 0,
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
			<PuzzleCommands createNewPuzzle={setNewPuzzle}/>
			{board}
			<Solver arrayNumbers={state.arrayNumbers} size={state.size} snail={state.snail} solvable={state.solvable}/>
		</div>
	)
};

export default NPuzzle;
