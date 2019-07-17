import React from 'react';

import Part from "../../../../UI/Part/Part";
import Slider from "@material-ui/core/Slider";


const thresholdPurgeChanger = (props) => (
	<Part title="Change Purge Threshold">
		<Slider step={1000} min={100000} max={1000000} value={props.thresholdPurge}
				onChange={(_, value) => props.changed(value)} />
	</Part>
);

export default thresholdPurgeChanger;