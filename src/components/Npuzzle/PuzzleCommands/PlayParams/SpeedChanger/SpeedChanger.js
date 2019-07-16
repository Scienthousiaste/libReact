import React from 'react';

import Part from '../../../../UI/Part/Part';

import Slider from '@material-ui/core/Slider';


const speedChanger = (props) => (
	<Part title="Change speed">
		<Slider step={props.step} min={props.min} max={ props.max } value={props.speed} onChange={props.speedChanged} />
	</Part>
);

export default speedChanger;