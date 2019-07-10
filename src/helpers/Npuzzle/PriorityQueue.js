
class PriorityNode {
	constructor(content, priority) {
		this.content = content;
		this.priority = priority;
	}
}

class MinPriorityQueue {
	// A priority queue built with a heap
	constructor() {
		this.heap = [null];
	}

	enqueue(elem, priority) {
		const newNode = new PriorityNode(elem, priority);
		this.heap.push(newNode);
		let currentIdx = this.heap.length - 1;
		let parentIdx = Math.floor(currentIdx / 2);
		while (this.heap[parentIdx] && newNode.priority < this.heap[parentIdx].priority) {
			const parent = this.heap[parentIdx];
			this.heap[parentIdx] = newNode;
			this.heap[currentIdx] = parent;
			currentIdx = parentIdx;
			parentIdx = Math.floor(currentIdx / 2);
		}
	}

	dequeue() {
		if (this.heap.length < 3) {
			const ret = this.heap.pop(); // if empty: returns null and put null back
			this.heap[0] = null;
			return ret;
		}
		const ret = this.heap[1];
		this.heap[1] = this.heap.pop();
		let currentIdx = 1;
		let [left, right] = [2*currentIdx, 2*currentIdx + 1];
		let currentChildIdx = this.heap[right] && this.heap[right].priority < this.heap[left].priority ? right : left;
		while (this.heap[currentChildIdx] && this.heap[currentIdx].priority > this.heap[currentChildIdx].priority) {
			let currentNode = this.heap[currentIdx]
			let currentChildNode = this.heap[currentChildIdx];
			this.heap[currentChildIdx] = currentNode;
			this.heap[currentIdx] = currentChildNode;
		}
		return ret;
	}

	isEmpty() {
		return this.heap.length <= 1;
	}
}

export default MinPriorityQueue;
