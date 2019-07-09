import React from 'react';

import classes from './PuzzleInfos.less';
import { countInversions } from '../../../helpers/Npuzzle/functions';


const puzzleInfos = (props) => {

	const inversions = countInversions(props.arrayNumbers, props.snail);
	const solved = (inversions === 0 && props.arrayNumbers[props.snail[props.arrayNumbers.length - 1]] === 0) ? 1 : 0;

	return (
		<div className={classes.PuzzleInfos}>
			<p>Inversions : {inversions}</p>
			{solved ? <p>Solved!</p> : null}
		</div>
	);
};

export default puzzleInfos;