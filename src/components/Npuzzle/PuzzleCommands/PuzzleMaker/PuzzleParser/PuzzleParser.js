import {MAX_PUZZLE_SIZE} from '../../../../../helpers/Npuzzle/defines';
import React, {useState} from 'react';

import Part from '../../../../UI/Part/Part';
import Input from '../../../../UI/Input/Input';
import Button from '../../../../UI/Button/Button';

const PuzzleParser = (props) => {
	const [state, setState] = useState({
		input: ''
	});

	const displayMessage = (m) => {
		alert(m);
	};

	const changeHandler = (event) => {
		setState({...state, input: event.target.value});
	};

	const parseInput = () => {
		let arr = state.input.split('\n');
		if (arr[0].indexOf('#') !== -1) {
			arr = arr.slice(1, arr.length);
		}
		if (arr.length > 0) {
			let candidateSize;
			let arrNumbers = [];
			let numbersBingo = [];

			if (arr.length === 1) {
				let numbers = arr[0].split(' ');
				candidateSize = Math.sqrt(numbers.length);
				if (candidateSize - Math.floor(candidateSize) !== 0) {
					displayMessage("incorrect number of values in a single row");
					return;
				}
				const numRegex = /(?:(\d+)[, ]*)/g;
				numbersBingo = Array(candidateSize * candidateSize).fill(false);

				let r;
				while ((r = numRegex.exec(arr[0])) !== null) {
					let n = parseInt(r[0]);
					if (numbersBingo[n] !== false) {
						console.log(numbersBingo);
						displayMessage("A value is out of range or doubled");
						return;
					}
					else {
						numbersBingo[n] = true;
						arrNumbers.push(n);
					}
				}
			}

			else {
				if (arr[0].split(' ').length === 1) {
					candidateSize = parseInt(arr[0]);
					arr = arr.slice(1, arr.length);
				} else {
					candidateSize = arr.length;
				}

				if (isNaN(candidateSize)) {
					displayMessage("Couldn't parse a candidate size - parsing failed");
					return;
				}
				if (candidateSize < 2) {
					displayMessage("The candidate size is inferiror to 2, but the npuzzle size must be at least 2");
					return;
				}
				if (candidateSize > MAX_PUZZLE_SIZE) {
					displayMessage("The detected size of the puzzle is too large (superior to " + MAX_PUZZLE_SIZE + ")");
					return;
				}

				numbersBingo = Array(candidateSize * candidateSize).fill(false);
				for (let i = 0; i < arr.length; i++) {
					arr[i] = arr[i].split("#")[0].trim();

					let numbers = arr[i].split(/\s/).filter((part) => {
						if (part.indexOf("#") === 0) return false;
						return !!part;
					}).map(x => parseInt(x));
					if (numbers.length !== candidateSize) {
						displayMessage("The " + (i + 1) + "th row doesn't have the correct number of values");
						return;
					}
					arrNumbers.push(...numbers);
					for (let j = 0; j < numbers.length; j++) {
						if (numbersBingo[numbers[j]] !== false) {
							displayMessage("A value is out of range or doubled");
							return;
						}
						numbersBingo[numbers[j]] = true;
					}
				}
			}

			if (numbersBingo.some(x => !x)) {
				displayMessage("The array size is incorrect");
				return;
			}
			props.createNewPuzzle(candidateSize, arrNumbers);
		}
	};

	return (
		<Part title="Parse array">
			<Input elementType={'textarea'} value={state.input} changed={changeHandler}/>
			<Button clicked={parseInput}>Parse puzzle</Button>
		</Part>
	);
};

export default PuzzleParser;
