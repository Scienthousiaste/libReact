import React from 'react';

import classes from './Radio.less';


const radio = (props) => {

	const onClickHandler = (key) => {
		if (props.clicked) props.clicked(props.options[key]);
	};

	const radios = props.options.map((elem, key) => (
		<div>
			<input type="radio"
				   key={key}
				   value={elem.value}
				   name={props.name}
				   id={elem.id ? elem.id : elem.value}
				   onClick={() => onClickHandler(key)}
			/>
			<label htmlFor={elem.id ? elem.id : elem.value}>{ elem.name ? elem.name : elem.value.charAt(0).toUpperCase() + elem.value.slice(1) }</label>
		</div>
	));

	return (
		<div className={classes.Radios}>
			{radios}
		</div>
	);
};

export default radio;