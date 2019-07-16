import React from 'react';

import classes from './CheckBox.less';
import CheckBox from '@material-ui/core/Checkbox';

const checkBox = (props) => (
	<div className={classes.CheckBox}>
		<CheckBox
			   name={props.name}
			   color="primary"
			   checked={props.checked}
			   id={props.id ? props.id : props.name}
			   onChange={props.clicked}
			   disabled={props.disabled}
		/>
		<label htmlFor={props.id ? props.id : props.name}>{ props.children ? props.children : props.name.charAt(0).toUpperCase() + props.name.slice(1) }</label>
	</div>
);

export default checkBox;