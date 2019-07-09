import React from 'react';
import classes from './Tile.less';

const Tile = (props) => {
    return (
        <div className={classes.Tile} onClick={() => props.clicked(props.val)} >
            {props.val === 0 ? '': props.val}
        </div>
    )
};

export default Tile;