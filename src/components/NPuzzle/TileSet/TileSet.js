import React from 'react';
import Tile from './Tile/Tile';
import classes from './TileSet.less';

const tileSet = (props) => {

    const tileArray = [...Array(props.size).keys()].map(x => {
        return (
            <div className={classes.row} key={x}>
                {props.arrayNumbers.slice(x * props.size, (x + 1) * props.size).map(v => <Tile val={v} key={v}  clicked={props.clicked} fontSize={360 / props.size}/>)}
            </div>
        )
    });



    return (
        <div className={classes.TileSet}>
            {tileArray}
        </div>
    )
};

export default tileSet;
