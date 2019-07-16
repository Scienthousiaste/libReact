import React from 'react';

import Part from '../../../../UI/Part/Part';
import Slider from "@material-ui/core/Slider";

const weightChanger = (props) => (
	<Part title="Change weight of heuristic">
		<Slider step={1} min={1} max={props.max} value={props.weight} valueLabelDisplay={'auto'}
				onChange={(_, value) => props.changed(value)} disabled={props.disabled}/>
	</Part>
);

export default weightChanger;