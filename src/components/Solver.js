import React from 'react';

const solver = (props) => {

    const solve = (arr, snail) => {
        return (() => {
            if (arr[snail[0]] === 0) {
                return
            }
            alert('no way to solve that for now haha');
        })

    };

    const solvable = props.inversions % 2 === 0 ? 1 : 0;
    return (
        solvable ? <button onClick={solve(props.arrayNumbers, props.snail)}>Solve</button> : <p>Unsolvable</p>
    )
};

export default solver;