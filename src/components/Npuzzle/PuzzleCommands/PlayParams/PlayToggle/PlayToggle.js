import React from 'react';
import Button from '../../../../UI/Button/Button';
import Part from '../../../../UI/Part/Part';

const playToggle = (props) => (
	<Part>
		<Button clicked={props.playClicked} disabled={!props.playAuthorised} type={props.play ? 'Danger' : 'Success'}>{props.play ? 'Pause' : 'Play'}</Button>
	</Part>
);

export default playToggle;