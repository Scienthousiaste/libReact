import React from 'react';

import classes from './PuzzleCommands.less';

import PuzzleParser from './PuzzleParser/PuzzleParser';
import PuzzleGenerator from './PuzzleGenerator/PuzzleGenerator';

const puzzleCommands = (props) => (
	<div className={classes.PuzzleCommands}>
		<PuzzleParser createNewPuzzle={props.createNewPuzzle} />
		<PuzzleGenerator createNewPuzzle={props.createNewPuzzle} />
	</div>
);

export default puzzleCommands;