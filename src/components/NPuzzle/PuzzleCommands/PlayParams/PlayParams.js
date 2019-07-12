import React, {useState, useEffect} from 'react';

import classes from './PlayParams.less';

import Input from '../../../UI/Input/Input';

const PlayParams = (props) => {

	return (
		<div className={classes.PlayParams}>
			<Input />
		</div>
	);
};

export default PlayParams;