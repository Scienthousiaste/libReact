import React, {useState, useEffect} from 'react';
import classes from './Npuzzle.less';

import {computeSnailIteration, countInversions, generateRandomArray} from '../../helpers/Npuzzle/functions';

import TileSet from './TileSet/TileSet';
import Spinner from '../UI/Spinner/Spinner';
import PuzzleInfos from './PuzzleInfos/PuzzleInfos';
import PuzzleCommands from './PuzzleCommands/PuzzleCommands';
import Solver from './Solver/Solver';

import {MAX_SPEED} from '../../helpers/Npuzzle/defines';

const Npuzzle = () => {
	const [state, setState] = useState({
		snail: null,
		size: 0,
		solvable: false,
		loading: true,
		startArray: null,
	});

	const [arrayState, setArrayState] = useState(null);

	const [playState, setPlayState] = useState({
		arrays: null,
		currentIndex: 0,
	});

	const [playParams, setPlayParams] = useState({
		play: false,
		playAuthorised: false,
		speed: 800,
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
		console.log('LA');
	}, []);

	useEffect(() => {
		if (playState.arrays
			&& playParams.play
			&& playState.currentIndex + 1 < playState.arrays.length) {
			setTimeout(() => {
				const newIndex = playState.currentIndex + 1;
				setPlayState({
					...playState,
					currentIndex: newIndex,
				});
				setArrayState(playState.arrays[newIndex]);
			}, MAX_SPEED - playParams.speed + 1);
		}
	}, [playState, playParams.play]);

	const onResolveHandler = (arrays) => {
		setPlayState({
			arrays: arrays,
			currentIndex: 0,
		});
		setPlayParams({...playParams, play: true, playAuthorised: true});
		console.log(arrays);
	};

	const onChangeSpeedHandler = (speed) => {
		setPlayParams({
			...playParams,
			speed: speed,
		});
	};

	const keyPressHandler = (event) => {
		console.log(event.key);
		switch (event.key) {
			case ' ' :
				togglePlayHandler();
				break;
			case 'ArrowLeft' :
				changeStepHandler(playState.currentIndex - 1);
				break;
			case 'ArrowRight':
				changeStepHandler(playState.currentIndex + 1);
				break;
			default:
				break;
		}
	};

	const togglePlayHandler = () => {
		if (playParams.playAuthorised) {
			setPlayParams({
				...playParams,
				play: !playParams.play,
			});
		}
	};

	const changeStepHandler = (index) => {
		if (!playState.arrays || index < 0 || index >= playState.arrays.length) return;
		setPlayState({
			...playState,
			currentIndex: index,
		});
		setArrayState(playState.arrays[index]);
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
		setPlayParams({...playParams, play: false, playAuthorised: false});
		setTimeout(() => {
			setState({
				...state,
				snail: snail,
				size: size,
				solvable: countInversions(array, snail) % 2 === 0,
				startArray: array,
			});
			setArrayState(array);
			setPlayState({
				play: false,
				arrays: null,
				currentIndex: 0,
			});
		}, 100);

	};

	let tileSet = <Spinner/>;

	if (!state.loading) {
		tileSet = (
			<TileSet arrayNumbers={arrayState} size={state.size} clicked={trySwap}/>
		);
	}

	return (
		<div tabIndex={'1'} className={classes.Npuzzle} onKeyDown={keyPressHandler}>
			<div className={classes.Board}>
				<PuzzleCommands createNewPuzzle={setNewPuzzle} startArray={state.startArray} size={state.size}
								changeSpeed={onChangeSpeedHandler} speed={playParams.speed}
								playClicked={togglePlayHandler} play={playParams.play}
								playAuthorised={playParams.playAuthorised}/>
				{tileSet}
				<Solver arrayNumbers={arrayState} size={state.size} snail={state.snail} solvable={state.solvable}
						resolved={onResolveHandler}/>
			</div>
		</div>
	)
};

export default Npuzzle;
