import React, {useState, useEffect} from 'react';

import classes from './PuzzleMaker.less';
import Box from '../../../UI/Box/Box';
import PuzzleParser from './PuzzleParser/PuzzleParser';
import PuzzleGenerator from './PuzzleGenerator/PuzzleGenerator';
import RestartPuzzle from './RestartPuzzle/RestartPuzzle';

import Button from '../../../UI/Button/Button';

const PuzzleMaker = (props) => {

	return (
		<Box>
			<div className={classes.PuzzleMaker}>
				<PuzzleParser createNewPuzzle={props.createNewPuzzle}/>
				<PuzzleGenerator createNewPuzzle={props.createNewPuzzle}/>
				<RestartPuzzle createNewPuzzle={props.createNewPuzzle} size={props.size} startArray={props.startArray}/>
			</div>
		</Box>
	);
};

export default PuzzleMaker;