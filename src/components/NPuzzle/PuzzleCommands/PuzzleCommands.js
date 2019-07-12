import React from 'react';

import classes from './PuzzleCommands.less';

import PuzzleParser from './PuzzleParser/PuzzleParser';
import PuzzleGenerator from './PuzzleGenerator/PuzzleGenerator';
import PlayParams from './PlayParams/PlayParams';
import Box from '../../UI/Box/Box';


const puzzleCommands = (props) => (
	<div className={classes.PuzzleCommands}>
		<Box >
			<PuzzleParser createNewPuzzle={props.createNewPuzzle}/>
			<PuzzleGenerator createNewPuzzle={props.createNewPuzzle}/>
		</Box>
		<PlayParams/>
	</div>
);

export default puzzleCommands;