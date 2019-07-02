import React from 'react';
import Tile from "./Tile";

const TileSet = (props) => {

    const tileSet = [...Array(props.size).keys().map((x) => { < div className="col" >
        {props.arrayNumbers.slice(x * props.size, props.size).map(v => < Tile val={v} />)}
        </div>;
    }];

    return (
        <div className="TileSet">
            {tileSet}
        </div>
    )
};

export default TileSet;