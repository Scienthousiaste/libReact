import React, { useState, useEffect } from 'react';
import TileSet from './TileSet';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const Npuzzle = (props) => {
    const [ state, setState ] = useState( {
            size: props.size,
            arrayNumbers: shuffle([...Array(props.size * props.size).keys()])
        }
    );

    return (
        <div className="Npuzzle">
            <TileSet arrayNumbers={state.arrayNumbers} size={state.size} />
        </div>
    )
};

export default Npuzzle;
