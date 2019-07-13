import React, {useState, useEffect} from 'react';

import classes from './PlayParams.less';

import Button from '../../../UI/Button/Button';
import Slider from '@material-ui/core/Slider';
import Box from '../../../UI/Box/Box';

import { MAX_SPEED } from '../../../../helpers/Npuzzle/defines';

const PlayParams = (props) => {


	const onChangeSpeed = (_, value) => {
		props.changeSpeed(value);
	};

	return (
		<Box>
			<Slider step={1} min={1} max={ MAX_SPEED } defaultValue={props.speed} onChange={onChangeSpeed} />
			<Button clicked={props.playClicked}>Play</Button>
		</Box>
	);
};

export default PlayParams;