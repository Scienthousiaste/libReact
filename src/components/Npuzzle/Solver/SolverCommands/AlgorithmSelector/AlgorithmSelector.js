import React from 'react';

import Radio from '../../../../UI/Radio/Radio';
import Part from '../../../../UI/Part/Part';

const algorithmSelector = (props) => {
	const algorithmOptions = [...props.algorithms];
	algorithmOptions[props.selected]['selected'] = true;

	return (
		<Part title="Select the algorithm">
			<Radio name={'algorithm'} options={algorithmOptions} clicked={(elem) => props.changed(elem)}/>
		</Part>
	);
};

export default algorithmSelector;