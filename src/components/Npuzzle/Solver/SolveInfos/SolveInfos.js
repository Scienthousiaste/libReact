import React from 'react';

import Box from '../../../UI/Box/Box';
import Part from '../../../UI/Part/Part';



const SolveInfos = (props) => {

	return (
		<Box>
			<Part title="Time">
				{props.time}
			</Part>
			<Part title="Time Complexity">
				{props.timeComplexity}
			</Part>
			<Part title="Size Complexity">
				{props.sizeComplexity}
			</Part>
			{props.purges.length ? <Part title="Purges">
				{props.purges.length}
			</Part> : null}
		</Box>
	);
};

export default SolveInfos;