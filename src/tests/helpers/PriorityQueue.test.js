import PriorityQueue from '../../helpers/Npuzzle/PriorityQueue'

const doTestsPriorityQueue = () => {
	let pq = new PriorityQueue();
	console.assert(pq.isEmpty());
	pq.enqueue("10", 10);
	console.assert(!(pq.isEmpty()));
	pq.enqueue("3", 3);
	pq.enqueue("2", 2);
	pq.enqueue("5", 5);
	pq.enqueue("50", 50);
	pq.enqueue("20", 20);
	pq.enqueue("11", 11);
	pq.enqueue("5bis", 5);
	pq.enqueue("50bis", 50);
	pq.enqueue("1", 1);
	pq.enqueue("5tierce", 5);

	let node = pq.dequeue();
	let oldPriority = node.priority;
	while (!pq.isEmpty()) {
		let n2 = pq.dequeue();
		console.assert(n2.priority >= oldPriority);
		oldPriority = n2.priority;
	}
}

export default doTestsPriorityQueue;
