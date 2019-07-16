import React from 'react';

import Part from '../../../../UI/Part/Part';
import Button from '../../../../UI/Button/Button';


const restartPuzzle = (props) => (
	<Part title="Restart Puzzle">
		<Button clicked={() => props.createNewPuzzle(props.size, props.startArray)}>Restart</Button>

	</Part>
);

export default restartPuzzle;