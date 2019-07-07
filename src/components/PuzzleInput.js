import { MAX_PUZZLE_SIZE } from '../defines';
import React, { Component } from 'react';
import '../style/PuzzleInput.css';

class PuzzleInput extends Component {
	state = {
		input : ''
	};

	displayMessage = (m) => {
		alert(m);
	}
	changeHandler = (event) => {
		this.setState({input : event.target.value});
	}
	parseInput = () => {
		let arr = this.state.input.split('\n');
		if (arr[0].indexOf('#') !== -1) {
			arr = arr.slice(1, arr.length);
		}

		if (arr.length > 0) {
			let candidateSize;
			if (arr[0].split(' ').length === 1) {
				candidateSize = parseInt(arr[0]);
				arr = arr.slice(1, arr.length);
			}
			else { candidateSize = arr.length; }

			if (isNaN(candidateSize)) {
				this.displayMessage("Couldn't parse a candidate size - parsing failed");
				return;
			} 
			if (candidateSize < 2) {
				this.displayMessage("The candidate size is inferiror to 2, but the npuzzle size must be at least 2");
				return;
			}
			if (candidateSize > MAX_PUZZLE_SIZE) {
				this.displayMessage("The candidate size is too large (superior to " + MAX_PUZZLE_SIZE + ")");
				return;
			}




			alert(candidateSize);
		}
	}

	render() {
		return (
			<div className='PuzzleInput'>
				<p>Input a puzzle here: </p>
				<textarea value={this.state.input} onChange={this.changeHandler}/>
				<button onClick={this.parseInput}>Parse puzzle</button>
			</div>
		)
	}
}

export default PuzzleInput;


/*
const parseNpuzzle = () => {
		let arr = this.state.puzzle.split('\n');	

		alert(arr.length);	
	}
	*/
