import React, {useState, useEffect} from 'react';

import classes from './NPuzzleApp.less';

import NPuzzle from './NPuzzle/NPuzzle';
import PuzzleCommands from './PuzzleCommands/PuzzleCommands';

const NPuzzleApp = (props) => {

	const [state, setState] = useState({
		puzzles: null,
	});

	useEffect(() => {
		setState({
			...state,
			puzzles: [{size: 4}, {size: 3}],
		});
	}, []);

	const createNewPuzzle = (puzzleParams) => {
		let newPuzzles = [...state.puzzles];
		newPuzzles.push(puzzleParams);
		this.setState({
			...state,
			puzzles: newPuzzles,
		});
	};

	const npuzzles = state.puzzles ? state.puzzles.map((p, index) => (
			<NPuzzle
				key={index}
				size={p.size}
				arrayNumbers={p.arrayNumbers}
			/>
		)) : null;

	return (
		<div className={classes.NpuzzleApp}>
			<PuzzleCommands createNewPuzzle={createNewPuzzle} />
			{npuzzles}
		</div>
	);
};

export default NPuzzleApp;