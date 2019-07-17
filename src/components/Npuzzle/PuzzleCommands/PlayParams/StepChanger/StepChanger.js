import React from 'react';

import classes from './StepChanger.less';

import Part from '../../../../UI/Part/Part';
import Button from '../../../../UI/Button/Button';


const stepChanger = (props) => (
	<Part title="Change speed">
		<div className={classes.stepChanger}>
		<Button clicked={props.moveLeft} disabled={!(props.step > 0)} color={'primary'}>Left</Button>
			<p>{props.max ?  props.step + 1 + '/' + props.max : null}</p>
		<Button clicked={props.moveRight} disabled={!(props.step < props.max)} color={'primary'}>Right</Button>
		</div>
	</Part>
);

export default stepChanger;