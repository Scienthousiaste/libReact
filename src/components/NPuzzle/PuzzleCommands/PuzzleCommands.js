import React from 'react';

import classes from './PuzzleCommands.less';

import PuzzleParser from './PuzzleParser/PuzzleParser';

const puzzleCommands = (props) => (
	<div className={classes.PuzzleCommands}>
		<PuzzleParser createNewPuzzle={props.createNewPuzzle}/>
	</div>
);

export default puzzleCommands;