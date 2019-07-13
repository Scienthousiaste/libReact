import { computeLinearConflicts } from '../../../algorithms/Npuzzle/algorithm'
import { computeManhattanDistance } from '../../../algorithms/Npuzzle/algorithm'

const doTestsLinearConflicts = () => {

	let arr = [8, 2, 0, 1, 5, 4, 3, 6, 7];
	let snail = [0, 1, 2, 5, 8, 7, 6, 3, 4];
	let size = 3;

	console.assert(computeLinearConflicts(arr, size, snail) === computeManhattanDistance(arr, size, snail) + 4);

	arr = [1, 2, 3, 8, 0, 4, 7, 6, 5];
	console.assert(computeLinearConflicts(arr, size, snail) === computeManhattanDistance(arr, size, snail));
	
	let classic = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	let arr1 = [0, 2, 1, 7, 4, 5, 6, 3, 8];
	console.assert(computeLinearConflicts(arr1, size, classic) === computeManhattanDistance(arr1, size, classic) + 2); 
	let arr2 = [0, 2, 1, 5, 4, 3, 6, 7, 8];
	console.assert(computeLinearConflicts(arr2, size, classic) === computeManhattanDistance(arr2, size, classic) + 4); 
	
}

export default doTestsLinearConflicts;
