import React, {useState, useEffect} from 'react';
import classes from './Npuzzle.less';

import {computeSnailIteration, countInversions, generateRandomArray} from '../../helpers/Npuzzle/functions';

import TileSet from './TileSet/TileSet';
import PuzzleCommands from './PuzzleCommands/PuzzleCommands';
import Solver from './Solver/Solver';

import Modal from '../UI/Modal/Modal';

import {MAX_SPEED} from '../../helpers/Npuzzle/defines';
import {getTime} from '../../helpers/utilities';

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

	const [solution, setSolution] = useState({
		error : false,
		time: null,
		timeComplexity: null,
		sizeComplexity: null,
		purges: [],
	});

	const [visual, setVisual] = useState({
		showValue: true,
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

	const onWaitingResolve = () => {
		setState({
			...state,
			loading: true,
		});
	};

	const onResolveHandler = (sol) => {
		setState({
			...state,
			loading: false,
		});
		if (sol.error) {
			setSolution({...solution, error: true});
			return ;
		}
		setPlayState({
			arrays: sol.path,
			currentIndex: 0,
		});
		setPlayParams({...playParams, play: true, playAuthorised: true});
		setSolution({
			...solution,
			time: getTime(sol.infos.time),
			timeComplexity: sol.infos.timeComplexity,
			sizeComplexity: sol.infos.sizeComplexityTotal + sol.infos.sizeComplexity,
			purges: sol.infos.purges
		});
		console.log(solution);
	};

	const onChangeShowValueHandler = () => {
		console.log(!visual.showValue);
		setVisual({...visual, showValue: !visual.showValue});
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
			case 'p' :
				event.preventDefault();
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
		setPlayParams({...playParams, play: false});
		if (!playParams.play) {
			setPlayState({
				...playState,
				currentIndex: index,
			});
			setArrayState(playState.arrays[index]);
		}
	};

	const removeErrorHandler = () => {
		setSolution({...solution, error: false});
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
		let time = playParams.play ? 10 + MAX_SPEED - playParams.speed : 0;
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
		}, time);

	};

	let tileSet = <TileSet arrayNumbers={arrayState} size={state.size} tileClass={'Loading'} showValue={visual.showValue} />;

	if (!state.loading) {
		tileSet = (
			<TileSet arrayNumbers={arrayState} size={state.size} clicked={trySwap} showValue={visual.showValue} />
		);
	}

	return (
		<div tabIndex={'1'} className={classes.Npuzzle} onKeyDown={keyPressHandler}>
			<Modal show={solution.error} closed={removeErrorHandler}>
				<p>Cannot find a solution with these parameters.</p>
			</Modal>
			<div className={classes.Board}>
				<PuzzleCommands createNewPuzzle={setNewPuzzle} startArray={state.startArray} size={state.size}
								changeSpeed={onChangeSpeedHandler} speed={playParams.speed}
								playClicked={togglePlayHandler} play={playParams.play}
								playAuthorised={playParams.playAuthorised}
								currentStep={playState.currentIndex} maxStep={playState.arrays ? playState.arrays.length : null}
								stepChanged={changeStepHandler}
								showValueChanged={onChangeShowValueHandler} showValue={visual.showValue}
				/>
				{tileSet}
				<Solver arrayNumbers={arrayState} size={state.size} snail={state.snail}
						solvable={playParams.play ? false : state.solvable}
						resolved={onResolveHandler} waiting={onWaitingResolve} solution={solution} />
			</div>
		</div>
	)
};

export default Npuzzle;
