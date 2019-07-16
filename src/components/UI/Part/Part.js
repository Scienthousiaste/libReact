import React from 'react';

import classes from './Part.less';


const part = (props) => (
	<div className={classes.Part}>
		{props.title ? <h3 className={classes.Title}>{props.title}</h3> : null}
		<div className={classes.Content}>
			{props.children}
		</div>
	</div>
);

export default part;