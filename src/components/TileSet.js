import React from 'react';
import Tile from './Tile';
import withClass from './hoc/withClass';
import '../style/TileSet.css';

const TileSet = (props) => {
    const tileArray = [...Array(props.size).keys()].map(x => {
        return (
            < div className="col" key={x}>
                {props.arrayNumbers.slice(x * props.size, (x + 1) * props.size).map(v => < Tile val={v} key={v} clicked={props.clicked}/>)}
            </div>
        )
    });

    return (
        tileArray
    )
};

export default withClass(TileSet, "TileSet");
