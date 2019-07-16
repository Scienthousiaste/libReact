import React from 'react';

import classes from './PuzzleCommands.less';

import PuzzleMaker from './PuzzleMaker/PuzzleMaker';
import PlayParams from './PlayParams/PlayParams';


const puzzleCommands = (props) => (
	<div className={classes.PuzzleCommands}>
		<PuzzleMaker createNewPuzzle={props.createNewPuzzle} size={props.size} startArray={props.startArray}/>
		<PlayParams changeSpeed={props.changeSpeed} speed={props.speed} playClicked={props.playClicked}
					play={props.play} playAuthorised={props.playAuthorised}/>
	</div>
);

export default puzzleCommands;