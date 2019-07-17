import React from 'react';

import Part from "../../../../UI/Part/Part";
import CheckBox from "../../../../UI/CheckBox/CheckBox";


const toggleShowValue = (props) => (
		<Part>
			<CheckBox checked={props.checked} clicked={props.showValueChanged} name="showValue">show value</CheckBox>
		</Part>
);

export default toggleShowValue;