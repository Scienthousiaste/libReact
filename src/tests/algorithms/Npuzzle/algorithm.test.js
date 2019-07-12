import { computeLinearConflicts } from '../../../algorithms/Npuzzle/algorithm'
import { computeManhattanDistance } from '../../../algorithms/Npuzzle/algorithm'

	/*
8 2 0
1 5 4
3 6 7
sensé avoir 2 linear conflicts (1-8 et 6-7, en trouve un seul)
*/

const doTestsLinearConflicts = () => {

	let arr = [8, 2, 0, 1, 5, 4, 3, 6, 7];
	let snail = [0, 1, 2, 5, 8, 7, 6, 3, 4];
	let size = 3;

	console.assert(computeLinearConflicts(arr, size, snail) === computeManhattanDistance(arr, size, snail) + 4);


	arr = [1, 2, 3, 8, 0, 4, 7, 6, 5];
	console.assert(computeLinearConflicts(arr, size, snail) === computeManhattanDistance(arr, size, snail));
	
}

export default doTestsLinearConflicts;
