import React from 'react';
import '../style/Tile.css';

const Tile = (props) => {
    return (
        <div className="Tile" onClick={() => props.clicked(props.val)} >
            {props.val === 0 ? '': props.val}
        </div>
    )
};

export default Tile;