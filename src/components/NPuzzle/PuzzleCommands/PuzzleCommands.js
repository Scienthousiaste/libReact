import React from 'react';

import classes from './PuzzleCommands.less';

import PuzzleParser from './PuzzleParser/PuzzleParser';
import PuzzleGenerator from './PuzzleGenerator/PuzzleGenerator';
import PlayParams from './PlayParams/PlayParams';


const puzzleCommands = (props) => (
	<div className={classes.PuzzleCommands}>
		<div className={classes.PuzzleCreators}>
			<PuzzleParser createNewPuzzle={props.createNewPuzzle}/>
			<PuzzleGenerator createNewPuzzle={props.createNewPuzzle}/>
		</div>
		<PlayParams/>
	</div>
);

export default puzzleCommands;