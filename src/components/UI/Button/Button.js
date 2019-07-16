import React from 'react';

import classes from './Button.css';

import Button from '@material-ui/core/Button';

const button = (props) => (
	<Button onClick={props.clicked} disabled={props.disabled} className={classes.Button} color={props.color} href={null}>{props.children}</Button>
);

export default button;
