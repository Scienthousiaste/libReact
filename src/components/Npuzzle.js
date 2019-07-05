import React, { Component } from 'react';
import TileSet from './TileSet';
import '../style/Npuzzle.css';

/*
The user must be able to choose between at LEAST 3 (relevant) heuristic functions.
    The Manhattan-distance heuristic is mandatory, the other two are up to you. By
"relevant" we mean they must be admissible (Read up on what this means) and
they must be something other than "just return a random value because #YOLO".
• At the end of the search, the program has to provide the following values:
◦ Total number of states ever selected in the "opened" set (complexity in time)
◦ Maximum number of states ever represented in memory at the same time
during the search (complexity in size)
◦ Number of moves required to transition from the initial state to the final state,
    according to the search
◦ The ordered sequence of states that make up the solution, according to the
search
◦ The puzzle may be unsolvable, in which case you have to inform the user and
exit
*/

function computeSnailIteration(size) {
    if (size < 2) return;
    let directionalMoves = [1, size, -1, size * - 1];
    let cur_i = 0;
    let directionIdx = 0;
    let n_moves = size - 1;
    let beforeDecrementMoves = 3;
    let idxArr = [0];

    while (n_moves) {
        while (beforeDecrementMoves) {
            let movesThisDirection = n_moves;
            while (movesThisDirection) {
                cur_i += directionalMoves[directionIdx];
                movesThisDirection--;
                idxArr.push(cur_i);
            }
            directionIdx = (directionIdx + 1) % 4;
            beforeDecrementMoves--;
        }
        n_moves--;
        beforeDecrementMoves = 2;
    }
    return idxArr;
}

function countInversions(arr, snail) {
    let inversions = 0;
    let prevValues = [];
    console.log(snail.toString());

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < prevValues.length; j++) {
            if (arr[snail[i]] < prevValues[j]) {
                console.log("i " + i + " j " + j + " arr[snail[i]]" + arr[snail[i]] + " prevValues[j] " + prevValues[j]);

                inversions++;
            }
        }
        if (arr[i] === 0) prevValues.push(Number.MAX_SAFE_INTEGER);
        else prevValues.push(arr[i]);
    }

    return inversions;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class Npuzzle extends Component {
    state =  {
        snail: computeSnailIteration(this.props.size),
        size: this.props.size,
        arrayNumbers: shuffle([...Array(this.props.size * this.props.size).keys()])
    };

    trySwap = (value) => {
        return (() => {
            let idx = this.state.arrayNumbers.findIndex((element) => element === value);
            if (idx !== -1 && value !== 0) {
                let idxZero = this.state.arrayNumbers.findIndex((element) => element === 0);
                if ( ((idxZero === idx + 1) && (idxZero % this.state.size !== 0))
                    || ((idxZero === idx - 1) && (idxZero % this.state.size !== this.state.size - 1))
                    || idxZero === idx + this.state.size
                    || idxZero === idx - this.state.size) {

                    let newArr = [...this.state.arrayNumbers];
                    newArr[idx] = this.state.arrayNumbers[idxZero];
                    newArr[idxZero] = this.state.arrayNumbers[idx];
                    this.setState({arrayNumbers: newArr});
                }
            }
        });
    };

    render = () => {
        return (
            <div className="Npuzzle">
                <TileSet arrayNumbers={this.state.arrayNumbers} size={this.state.size} clicked={this.trySwap}/>
                <p>Inversions : {countInversions(this.state.arrayNumbers, this.state.snail)}</p>
            </div>
        )
    };
};

export default Npuzzle;
