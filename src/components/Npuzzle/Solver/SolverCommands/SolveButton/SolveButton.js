import React from 'react';

import Button from '../../../../UI/Button/Button';
import Part from '../../../../UI/Part/Part';


const solveButton = (props) => (
	<Part>
		<Button clicked={props.solve} color="primary" disabled={!props.solvable}>Solve</Button>
	</Part>
);

export default solveButton;