import React from 'react';
import classes from './Tile.less';

const Tile = (props) => {

    const tileClasses = [classes.Tile];

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
        <div className={tileClasses.join(' ')} style={{fontSize: props.fontSize.toString() + 'px' }} onClick={() => props.clicked(props.val)} >
            {props.val === 0 ? '': props.val}
        </div>
    )
};

export default Tile;