import React from 'react';

import Box from '../../../UI/Box/Box';
import SpeedChanger from './SpeedChanger/SpeedChanger';
import PlayToggle from './PlayToggle/PlayToggle';


import { MAX_SPEED } from '../../../../helpers/Npuzzle/defines';

const PlayParams = (props) => {


	const onChangeSpeed = (_, value) => {
		props.changeSpeed(value);
	};

	return (
		<Box>
			<SpeedChanger step={1} min={1} max={ MAX_SPEED } speed={props.speed} speedChanged={onChangeSpeed} />
			<PlayToggle playClicked={props.playClicked} play={props.play} playAuthorised={props.playAuthorised}/>
		</Box>
	);
};

export default PlayParams;