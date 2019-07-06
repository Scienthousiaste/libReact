import React from 'react';
import Tile from './Tile';
import withClass from './hoc/withClass';
import '../style/TileSet.css';

const tileSet = (props) => {
    const tileArray = [...Array(props.size).keys()].map(x => {
        return (
            < div className="row" key={x}>
                {props.arrayNumbers.slice(x * props.size, (x + 1) * props.size).map(v => < Tile val={v} key={v} clicked={props.clicked}/>)}
            </div>
        )
    });

    return (
        tileArray
    )
};

export default withClass(tileSet, "TileSet");
