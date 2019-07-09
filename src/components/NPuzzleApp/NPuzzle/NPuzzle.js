import React, {useState, useEffect} from 'react';
import TileSet from './TileSet/TileSet';
import Solver from './Solver/Solver';
import classes from './NPuzzle.less';


const computeSnailIteration = (size) => {
	if (size < 2) return [];
	let directionalMoves = [1, size, -1, size * -1];
	let cur_i = 0;
	let directionIdx = 0;
	let n_moves = size - 1;
	let beforeDecrementMoves = 3;
	let idxArr = [0];

	while (n_moves) {
		while (beforeDecrementMoves) {
			for (let movesThisDirection = n_moves; movesThisDirection > 0; movesThisDirection--) {
				cur_i += directionalMoves[directionIdx];
				idxArr.push(cur_i);
			}
			directionIdx = (directionIdx + 1) % 4;
			beforeDecrementMoves--;
		}
		n_moves--;
		beforeDecrementMoves = 2;
	}
	return idxArr;
};

const countInversions = (arr, snail) => {
	//works, but is SLOW
	let inversions = 0;
	let prevValues = [];

	for (let i = 0; i < arr.length; i++) {
		if (arr[snail[i]] !== 0) {
			for (let j = 0; j < prevValues.length; j++) {
				if (arr[snail[i]] < prevValues[j]) {
					inversions++;
				}
			}
		}
		prevValues.push(arr[snail[i]]);
	}
	return inversions;
};

const shuffle = (a) => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
};

const NPuzzle = (props) => {
	const [state, setState] = useState({
		snail: null,
		size: 0,
		arrayNumbers: null,
		loading: true,
	});

	useEffect(() => {
		setState({
			...state,
			snail: computeSnailIteration(props.size),
			size: props.size,
			arrayNumbers: props.arrayNumbers ? props.arrayNumbers.slice(0) :
				shuffle([...Array(props.size * props.size).keys()]),
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

	let board = null;

	if (!state.loading) {
		const inversions = countInversions(state.arrayNumbers, state.snail);
		const solved = (inversions === 0 && state.arrayNumbers[state.snail[state.arrayNumbers.length - 1]] === 0) ? 1 : 0;
		board = <div><p>Inversions : {inversions}</p>{solved ? <p>Solved!</p> : ''}</div>;
	}

	return (
		<div className={classes.Npuzzle}>
			{state.loading ? null : <TileSet arrayNumbers={state.arrayNumbers} size={state.size} clicked={trySwap}/>}
			{board}
			<Solver arrayNumbers={state.arrayNumbers} snail={state.snail} inversions={inversions} size={state.size}/>
		</div>
	)
};

export default NPuzzle;
