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
				this.displayMessage("The detected size of the puzzle is too large (superior to " + MAX_PUZZLE_SIZE + ")");
				return;
			}
			if (arr.length != candidateSize) {
				this.displayMessage("The given size of the puzzle doesn't match the given puzzle");
				return ;
			}

			let arrNumbers = [];
			let numbersBingo = Array(candidateSize * candidateSize).fill(false);

			for (let i = 0; i < arr.length; i++) {
				let numbers = arr[i].split(/\s/).filter((part) => {return !!part;}).map(x => parseInt(x));
				if (numbers.length != candidateSize) {
					this.displayMessage("The "+ (i + 1) + "th row doesn't have the correct number of values");
					return ;
				}
				arrNumbers.push(...numbers);
				for (let j = 0; j < numbers.length; j++) {
					if (numbersBingo[numbers[j]] !== false) {
						this.displayMessage("A value is out of ranged or doubled");
						return;
					}
					numbersBingo[numbers[j]] = true;
				}
			}

			alert("npuzzle constructed");
			console.log(arrNumbers);
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
