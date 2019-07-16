import React from 'react';

import Part from '../../../../UI/Part/Part';
import Button from '../../../../UI/Button/Button';


const restartPuzzle = (props) => (
	<Part>
		<Button clicked={() => props.createNewPuzzle(props.size, props.startArray)} color="primary">Restart</Button>

	</Part>
);

export default restartPuzzle;