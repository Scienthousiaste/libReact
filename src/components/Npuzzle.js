import React, { Component } from 'react';
import TileSet from './TileSet';
import Solver from './Solver';
import '../style/Npuzzle.css';


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
    //works, but is SLOW
    let inversions = 0;
    let prevValues = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[snail[i]] !== 0) {
            for (let j = 0; j < prevValues.length; j++) {
                if (arr[snail[i]] < prevValues[j]) {
                    inversions++;
                }
            }
        }
        prevValues.push(arr[snail[i]]);
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
	state = {
       	snail: computeSnailIteration(this.props.size),
        size: this.props.size,
		arrayNumbers: this.props.arrayNumbers ? this.props.arrayNumbers.slice(0) :
					shuffle([...Array(this.props.size * this.props.size).keys()])
	}

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
        let inversions = countInversions(this.state.arrayNumbers, this.state.snail);
        let solved = (inversions === 0 && this.state.arrayNumbers[this.state.snail[this.state.arrayNumbers.length - 1]] === 0) ? 1 : 0;

        return (
            <div className="Npuzzle">
                <TileSet arrayNumbers={this.state.arrayNumbers} size={this.state.size} clicked={this.trySwap}/>
                <p>Inversions : {inversions}</p>
                {solved ? <p>Solved!</p> :''}
                <Solver arrayNumbers={this.state.arrayNumbers} inversions={inversions} snail={this.state.snail} />
            </div>
        )
    };
};

export default Npuzzle;
