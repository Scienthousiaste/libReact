import React from 'react';

import classes from './Backdrop.css'

const backdrop = (props) => (
	<div style={{'display': props.show ? 'initial' : 'none'}} className={classes.Backdrop} onClick={props.clicked} />
);

export default backdrop;