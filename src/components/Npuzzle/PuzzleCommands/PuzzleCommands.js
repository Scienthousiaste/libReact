import React from 'react';

import classes from './PuzzleCommands.less';

import PuzzleMaker from './PuzzleMaker/PuzzleMaker';
import PlayParams from './PlayParams/PlayParams';


const puzzleCommands = (props) => (
	<div className={classes.PuzzleCommands}>
		<PuzzleMaker createNewPuzzle={props.createNewPuzzle} size={props.size} startArray={props.startArray}/>
		<PlayParams changeSpeed={props.changeSpeed} speed={props.speed} playClicked={props.playClicked}
					play={props.play} playAuthorised={props.playAuthorised}
					currentStep={props.currentStep} maxStep={props.maxStep} stepChanged={props.stepChanged}
					showValueChanged={props.showValueChanged} showValue={props.showValue}
		/>
	</div>
);

export default puzzleCommands;