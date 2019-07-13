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
		solvable: false,
		loading: true,
		startArray: null,
	});

	const [arrayState, setArrayState] = useState(null);

	const [playState, setPlayState] = useState({
		play: false,
		arrays: null,
		currentIndex: 0,
	});

	const [playParams, setPlayParams] = useState({
		pause: false,
		time: 60,
	});

	useEffect(() => {
		const size = 5;
		const array = generateRandomArray(size, true);
		const snail = computeSnailIteration(size);
		setState({
			snail: snail,
			size: size,
			solvable: countInversions(array, snail) % 2 === 0,
			loading: false,
			startArray: array,
		});
		setArrayState(array);
	}, []);

	useEffect(() => {
		if (playState.arrays
			&& !playParams.pause
			&& playState.currentIndex + 1 < playState.arrays.length) {
			setTimeout(() => {
				const newIndex =  playState.currentIndex + 1;
				setPlayState({
					...playState,
					currentIndex: newIndex,
				});
				setArrayState(playState.arrays[newIndex]);
			}, playParams.time);
		}
	}, [playState, playParams]);

	const onResolveHandler = (arrays) => {
		setPlayState({
			play: true,
			arrays: arrays,
			currentIndex: 0,
		});
		console.log(arrays)
	};

	const trySwap = (value) => {
		let idx = arrayState.findIndex((element) => element === value);
		if (idx !== -1 && value !== 0) {
			const idxZero = arrayState.findIndex((element) => element === 0);
			if (((idxZero === idx + 1) && (idxZero % state.size !== 0))
				|| ((idxZero === idx - 1) && (idxZero % state.size !== state.size - 1))
				|| idxZero === idx + state.size
				|| idxZero === idx - state.size) {

				const newArr = [...arrayState];
				newArr[idx] = arrayState[idxZero];
				newArr[idxZero] = arrayState[idx];
				setArrayState(newArr);
			}
		}
	};

	const setNewPuzzle = (size, array) => {
		const snail = computeSnailIteration(size);
		setState({
			...state,
			snail: snail,
			size: size,
			solvable: countInversions(array, snail) % 2 === 0,
			startArray: array,
		});
		setArrayState(array);
	};

	let board = <Spinner/>;

	if (!state.loading) {
		board = (
			<div className={classes.Board}>
				<TileSet arrayNumbers={arrayState} size={state.size} clicked={trySwap}/>
				<PuzzleInfos arrayNumbers={arrayState} snail={state.snail}/>
			</div>
		);
	}

	return (
		<div className={classes.Npuzzle}>
			<PuzzleCommands createNewPuzzle={setNewPuzzle} startArray={state.startArray} size={state.size} />
			{board}
			<Solver arrayNumbers={arrayState} size={state.size} snail={state.snail} solvable={state.solvable}
					resolved={onResolveHandler} />
		</div>
	)
};

export default NPuzzle;
