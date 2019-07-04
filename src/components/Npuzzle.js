import React, { Component } from 'react';
import TileSet from './TileSet';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class Npuzzle extends Component {
    state =  {
            size: this.props.size,
            arrayNumbers: shuffle([...Array(this.props.size * this.props.size).keys()])
    };

    trySwap = (value) => {
        return (() => {
            let idx = this.state.arrayNumbers.findIndex((element) => element === value);
            if (idx !== -1 && value !== 0) {
                let idxZero = this.state.arrayNumbers.findIndex((element) => element === 0);
                if (idxZero === idx + 1 || idxZero === idx - 1
                    || idxZero === idx + this.state.size || idxZero === idx - this.state.size) {

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
            </div>
        )
    };
};

export default Npuzzle;
