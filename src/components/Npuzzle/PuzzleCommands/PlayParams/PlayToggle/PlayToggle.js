import React from 'react';
import Button from '../../../../UI/Button/Button';
import Part from '../../../../UI/Part/Part';

const playToggle = (props) => (
	<Part>
		<Button clicked={props.playClicked} disabled={!props.playAuthorised} color={props.play ? 'secondary' : 'primary'}>{props.play ? 'Pause' : 'Play'}</Button>
	</Part>
);

export default playToggle;