import React from 'react';
import '../style/PuzzleInput.css';

const puzzleInput = (props) => {
	return (
		<div className='PuzzleInput'>
			<p>Input a puzzle here: </p>
			<textarea />
			<button onClick={props.parseNpuzzle.bind(this, "1")}>Create Npuzzle</button>
		</div>
	)
}

export default puzzleInput;
