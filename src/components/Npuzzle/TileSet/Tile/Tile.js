import React, { useState } from 'react';
import classes from './Tile.less';

const Tile = (props) => {

    const tileClasses = [classes.Tile];

    const [ state, setState ] = useState({
		hover: false,
	});

    const onHoverHandler = () => setState({...state, hover: true});

	const onLeaveHandler = () => setState({...state, hover: false});


	if (props.tileClass) {
    	tileClasses.push(classes[props.tileClass]);
	}

    if (props.val) {
    	switch (props.val % 2) {
			case 0 : tileClasses.push(classes.Even); break;
			case 1 : tileClasses.push(classes.Odd); break;
			default : break;
		}
    } else {
		tileClasses.push(classes.Null);
	}

    return (
        <div className={tileClasses.join(' ')} onMouseOver={onHoverHandler} onMouseLeave={onLeaveHandler} style={{fontSize: props.fontSize.toString() + 'px' }} onClick={() => props.clicked(props.val)} >
            {props.val === 0 || (props.hideValue && !state.hover) ? null : props.val}
        </div>
    );
};

export default Tile;