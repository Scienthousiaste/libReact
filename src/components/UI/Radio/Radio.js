import React from 'react';

import Radio from '@material-ui/core/Radio';
import {RadioGroup} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const radio = (props) => {

	const onClickHandler = (value) => {
		if (props.clicked) props.clicked(props.options.find( (elem) => elem.value === value));
	};

	const radios = props.options.map((elem, key) => (
		<FormControlLabel
			key={key}
			value={elem.value}
			name={props.name}
			control={<Radio color="primary"/>}
			label={elem.name ? elem.name : elem.value.charAt(0).toUpperCase() + elem.value.slice(1)}
			checked={elem.selected}
			id={elem.id ? elem.id : elem.value}
			disabled={props.disabled ? true : elem.disabled}
		/>
	));

	return (
		<RadioGroup onChange={(_, value) => onClickHandler(value)}>
			{radios}
		</RadioGroup>
	);
};

export default radio;