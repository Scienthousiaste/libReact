import React from 'react';

import Box from '../../../UI/Box/Box';
import Part from '../../../UI/Part/Part';



const SolveInfos = (props) => {

	return (
		<Box>{ props.show ?
			<Part title="infos">
				<p>Time : {props.time} s</p>
				<p>Time Complexity : {props.timeComplexity}</p>
				<p>Size Complexity : {props.sizeComplexity}</p>
				<p>Steps : {props.steps}</p>
				{props.purges.length ? <p>Purges : {props.purges.length}</p> : null}
			</Part>
			: null}
		</Box>
	);
};

export default SolveInfos;