import React from 'react';

import Part from "../../../../UI/Part/Part";
import Radio from "../../../../UI/Radio/Radio";


const heuristicSelector = (props) => {

	const heuristicOptions = [...props.heuristics];
	heuristicOptions[props.selected]['selected'] = true;

	return (
		<Part title="Select the heuristic">
			<Radio name={'heuristics'} disabled={props.disabled} options={heuristicOptions} clicked={(elem) => props.changed(elem)}/>
		</Part>
	);
};

export default heuristicSelector;