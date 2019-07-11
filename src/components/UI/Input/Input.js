import React from 'react';

import classes from './Input.css';


const input = (props) => {

	const inputElemClasses = [classes.InputElem];

	if (props.invalid) {
		inputElemClasses.push(classes.Invalid);
	}

	const keyPressHandler = (event) => {
		switch (event.key) {
			case 'Enter':
				if (props.pressEnter) {
					event.preventDefault();
					props.pressEnter();
				}
				break;
			case 'ArrowDown' :
				if (props.pressDown) {
					event.preventDefault();
					props.pressDown();
				}
				break;
			case 'ArrowUp' :
				if (props.pressUp) {
					event.preventDefault();
					props.pressUp();
				}
				break;
			default :
				return;
		}
	};

	const inputElems = [
		{
			type: 'input',
			div: <input
				className={inputElemClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onKeyDown={keyPressHandler}/>
		},
		{
			type: 'textarea',
			div: <textarea
				className={inputElemClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
				onKeyDown={keyPressHandler}/>
		},
		{
			type: 'select',
			div: (
				<select
					className={inputElemClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
					onKeyDown={keyPressHandler}>
					{props.options ? props.options.map((option) => (
						<option key={option.value} value={option.value}>{option.displayValue}</option>
					)) : null}
				</select>
			)
		},
	];
	let inputElem = inputElems.find((elem) => (elem.type === props.elementType));

	if (inputElem) {
		inputElem = inputElem.div;
	} else {
		inputElem = <input
			className={inputElemClasses.join(' ')}
			{...props.elementConfig}
			value={props.value}
			onChange={props.changed}
			onKeyDown={keyPressHandler}/>;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElem}
		</div>
	);
};

export default input;
