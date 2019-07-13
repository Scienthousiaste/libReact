import React from 'react';

import classes from './PuzzleCommands.less';

import PuzzleParser from './PuzzleParser/PuzzleParser';
import PuzzleGenerator from './PuzzleGenerator/PuzzleGenerator';
import PlayParams from './PlayParams/PlayParams';
import Box from '../../UI/Box/Box';
import Button from '../../UI/Button/Button';


const puzzleCommands = (props) => (
	<div className={classes.PuzzleCommands}>
		<Box >
			<PuzzleParser createNewPuzzle={props.createNewPuzzle}/>
			<PuzzleGenerator createNewPuzzle={props.createNewPuzzle}/>
			<Button clicked={ () => props.createNewPuzzle(props.size, props.startArray) }>Restart</Button>
		</Box>
		<PlayParams changeSpeed={props.changeSpeed} speed={props.speed} playClicked={props.playClicked} />
	</div>
);

export default puzzleCommands;